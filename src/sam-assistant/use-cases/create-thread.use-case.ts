import OpenAI from "openai";


export const createThreadUseCae = async (openai: OpenAI) => {
    const {id} = await openai.beta.threads.create();
    
    return{id};
}