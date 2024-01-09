const OpenAI = require('openai');

export const createOpenAIClient = () => {
  const OPENAI_API_KEY = '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';

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  return openai;
};
