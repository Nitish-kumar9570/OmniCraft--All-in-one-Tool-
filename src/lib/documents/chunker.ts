export interface TextChunk {
  chunkIndex: number;
  pageNumber: number;
  content: string;
  metadata: {
    startChar: number;
    endChar: number;
    wordCount: number;
  };
}

export function chunkDocumentText(
  pages: Array<{ pageNumber: number; text: string }>,
  targetChunkSize: number = 800,
  overlap: number = 100
): TextChunk[] {
  const chunks: TextChunk[] = [];
  let globalChunkIndex = 0;

  for (const page of pages) {
    const text = page.text.trim();
    if (!text) continue;

    // Split by double newlines (paragraphs) or sentences
    const paragraphs = text.split(/\n\s*\n/);
    let currentChunk = "";
    let currentStartChar = 0;

    for (const para of paragraphs) {
      const cleanPara = para.trim();
      if (!cleanPara) continue;

      if ((currentChunk + "\n\n" + cleanPara).length <= targetChunkSize) {
        currentChunk += (currentChunk ? "\n\n" : "") + cleanPara;
      } else {
        if (currentChunk.trim()) {
          chunks.push({
            chunkIndex: globalChunkIndex++,
            pageNumber: page.pageNumber,
            content: currentChunk.trim(),
            metadata: {
              startChar: currentStartChar,
              endChar: currentStartChar + currentChunk.length,
              wordCount: currentChunk.split(/\s+/).length,
            },
          });
        }

        // Handle paragraph that itself is larger than targetChunkSize
        if (cleanPara.length > targetChunkSize) {
          const sentences = cleanPara.match(/[^.!?]+[.!?]+(\s|$)/g) || [cleanPara];
          let sentenceAcc = "";
          for (const s of sentences) {
            if ((sentenceAcc + s).length <= targetChunkSize) {
              sentenceAcc += s;
            } else {
              if (sentenceAcc.trim()) {
                chunks.push({
                  chunkIndex: globalChunkIndex++,
                  pageNumber: page.pageNumber,
                  content: sentenceAcc.trim(),
                  metadata: {
                    startChar: currentStartChar,
                    endChar: currentStartChar + sentenceAcc.length,
                    wordCount: sentenceAcc.split(/\s+/).length,
                  },
                });
              }
              sentenceAcc = s;
            }
          }
          currentChunk = sentenceAcc;
        } else {
          currentChunk = cleanPara;
        }
      }
    }

    if (currentChunk.trim()) {
      chunks.push({
        chunkIndex: globalChunkIndex++,
        pageNumber: page.pageNumber,
        content: currentChunk.trim(),
        metadata: {
          startChar: currentStartChar,
          endChar: currentStartChar + currentChunk.length,
          wordCount: currentChunk.split(/\s+/).length,
        },
      });
    }
  }

  return chunks;
}
