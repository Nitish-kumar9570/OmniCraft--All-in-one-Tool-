import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, CONFIG_LIMITS, sanitizeFilename } from "@/lib/security/authorization";
import { isAllowedFileType } from "@/lib/security/validation";
import { processDocumentFile } from "@/lib/documents/processor";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { user, supabase } = await getAuthenticatedUser();
    if (!user || !supabase) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded in form data." }, { status: 400 });
    }

    const filename = sanitizeFilename(file.name);
    const mimeType = file.type || "application/octet-stream";
    const fileSize = file.size;

    // Validate size limit
    const maxSizeBytes = CONFIG_LIMITS.MAX_FILE_SIZE_MB * 1024 * 1024;
    if (fileSize > maxSizeBytes) {
      return NextResponse.json(
        { error: `File exceeds maximum allowed size of ${CONFIG_LIMITS.MAX_FILE_SIZE_MB}MB` },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!isAllowedFileType(mimeType, filename)) {
      return NextResponse.json(
        { error: "Unsupported file type. Supported formats: PDF, PNG, JPG, TXT, Markdown, CSV, JSON." },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process document: Parse -> Chunk -> Embed
    const processed = await processDocumentFile(buffer, filename, mimeType);

    // Save document to Supabase `documents` table
    const { data: docRecord, error: docError } = await (supabase.from("documents") as any)
      .insert({
        user_id: user.id,
        filename: processed.document.filename,
        mime_type: processed.document.mimeType,
        file_size: processed.document.fileSize,
        page_count: processed.document.pageCount,
        title: processed.document.title,
        description: processed.document.description,
        status: "ready",
        metadata: processed.document.metadata,
      })
      .select()
      .single();

    if (docError || !docRecord) {
      console.error("Error creating document record in Supabase:", docError);
      return NextResponse.json({ error: "Failed to create document record." }, { status: 500 });
    }

    // Save document chunks to Supabase `document_chunks` table
    if (processed.chunks.length > 0) {
      const chunkInserts = processed.chunks.map((c) => ({
        document_id: docRecord.id,
        user_id: user.id,
        chunk_index: c.chunkIndex,
        page_number: c.pageNumber,
        content: c.content,
        embedding: c.embedding,
        metadata: c.metadata,
      }));

      const { error: chunkError } = await (supabase.from("document_chunks") as any).insert(chunkInserts);
      if (chunkError) {
        console.error("Error inserting document chunks:", chunkError);
      }
    }

    return NextResponse.json({
      document: {
        id: docRecord.id,
        filename: docRecord.filename,
        title: docRecord.title,
        pageCount: docRecord.page_count,
        fileSize: docRecord.file_size,
        status: docRecord.status,
        chunkCount: processed.chunks.length,
        createdAt: docRecord.created_at,
      },
      chunksCreated: processed.chunks.length,
      message: `Successfully processed "${filename}" into ${processed.chunks.length} searchable chunk(s).`,
    });
  } catch (err: any) {
    console.error("Upload API error:", err);
    return NextResponse.json({ error: err.message || "Document processing failed." }, { status: 500 });
  }
}
