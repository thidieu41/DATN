const OpenAI = require('openai');

export const createOpenAIClient = () => {
  const OPENAI_API_KEY = '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';

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  return openai;
};
