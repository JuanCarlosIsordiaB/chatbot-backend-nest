import OpenAI from "openai";


export const createThreadUseCae = async (openai: OpenAI) => {
    const thread = await openai.beta.threads.create();
    
    return{id: thread.id};
}