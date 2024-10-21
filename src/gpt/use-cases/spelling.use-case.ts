import OpenAI from 'openai';
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);



interface Options {
  prompt: string;
}

export const spellingCheckerUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(['Dime como haz estado el dia de']);
  

  return result.response.text();
};
