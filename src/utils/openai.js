const OpenAI = require('openai');

export const createOpenAIClient = () => {
  const OPENAI_API_KEY = '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';

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  return openai;
};
