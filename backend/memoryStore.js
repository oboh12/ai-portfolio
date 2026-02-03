let memory = {
  summary: "",
  messages: []
};

const MAX_MESSAGES = 8;

/**
 * Add a message to memory
 */
export function addMessage(role, content) {
  memory.messages.push({ role, content });

  // Keep only last N messages
  if (memory.messages.length > MAX_MESSAGES) {
    memory.messages.shift();
  }
}

/**
 * Return full memory object
 */
export function getMemory() {
  return memory;
}

/**
 * Update rolling conversation summary
 */
export function updateSummary(summary) {
  memory.summary = summary;
}

/**
 * Determine if summarization should occur
 */
export function shouldSummarize() {
  return memory.messages.length >= MAX_MESSAGES;
}

/**
 * Build AI-safe memory context for prompts
 */
export function buildMemoryContext() {
  let context = "";

  if (memory.summary) {
    context += `Conversation Summary:\n${memory.summary}\n\n`;
  }

  if (memory.messages.length) {
    context += "Recent Messages:\n";
    memory.messages.forEach(m => {
      context += `${m.role}: ${m.content}\n`;
    });
  }

  return context.trim();
}

/**
 * Reset memory completely
 */
export function resetMemory() {
  memory = { summary: "", messages: [] };
}