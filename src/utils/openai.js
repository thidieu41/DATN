const OpenAI = require('openai');

export const createOpenAIClient = () => {
  const OPENAI_API_KEY = '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';

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  return openai;
};
