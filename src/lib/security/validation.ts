export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
];

export function isAllowedFileType(mimeType: string, filename: string): boolean {
  if (ALLOWED_MIME_TYPES.includes(mimeType)) return true;

  const ext = filename.split(".").pop()?.toLowerCase();
  const allowedExtensions = ["pdf", "txt", "md", "csv", "json", "png", "jpg", "jpeg", "webp", "svg"];
  return Boolean(ext && allowedExtensions.includes(ext));
}

export function isImageFile(mimeType: string, filename: string): boolean {
  if (mimeType.startsWith("image/")) return true;
  const ext = filename.split(".").pop()?.toLowerCase();
  return Boolean(ext && ["png", "jpg", "jpeg", "webp", "svg"].includes(ext));
}

export function isPdfFile(mimeType: string, filename: string): boolean {
  if (mimeType === "application/pdf") return true;
  const ext = filename.split(".").pop()?.toLowerCase();
  return ext === "pdf";
}
