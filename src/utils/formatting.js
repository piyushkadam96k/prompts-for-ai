export function getLengthLabel(chars) {
  if (chars < 1000) return { label: 'Short', color: '#22c55e' };
  if (chars < 5000) return { label: 'Medium', color: '#f59e0b' };
  if (chars < 20000) return { label: 'Long', color: '#f97316' };
  return { label: 'Massive', color: '#ef4444' };
}

export function getWordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Approximate token count (~4 chars per token for English, common GPT tokenizer ratio)
export function getTokenEstimate(text) {
  return Math.ceil(text.length / 4);
}
