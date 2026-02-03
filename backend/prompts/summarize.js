export function summarizePrompt(conversation) {
  return `
You are an AI assistant embedded in a developer portfolio.

Summarize the following conversation into a short context that preserves:
- User intent
- Developer skills mentioned
- Relevant technical interests

Conversation:
${conversation}

Return a concise summary in plain text.
`;
}