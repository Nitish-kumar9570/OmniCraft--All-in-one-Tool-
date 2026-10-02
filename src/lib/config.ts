export const CONFIG_LIMITS = {
  MAX_FILE_SIZE_MB: parseInt(process.env.MAX_FILE_SIZE_MB || "25", 10),
  MAX_DOCUMENTS_PER_USER: parseInt(process.env.MAX_DOCUMENTS_PER_USER || "100", 10),
  MAX_CONTEXT_CHUNKS: parseInt(process.env.MAX_CONTEXT_CHUNKS || "8", 10),
  MAX_CHAT_HISTORY: parseInt(process.env.MAX_CHAT_HISTORY || "30", 10),
  MAX_RESEARCH_SOURCES: parseInt(process.env.MAX_RESEARCH_SOURCES || "6", 10),
};
