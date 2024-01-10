const OpenAI = require('openai');

export const createOpenAIClient = () => {
  const OPENAI_API_KEY = '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';

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  return openai;
};
