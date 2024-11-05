import OpenAI from "openai";

interface Options  {
    threadId:string;
    questions:string;
}

export const createMessageUseCase = async (openai:OpenAI , {threadId, questions}:Options) => {
    const message = await openai.beta.threads.messages.create(threadId, {content: questions, role:'user'});
    return message;
}