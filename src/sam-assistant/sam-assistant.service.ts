import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createThreadUseCae } from './use-cases';
import { QuestionDto } from './dtos/question.dto';
import { createMessageUseCase } from './use-cases/create-message.use-case';
import { threadId } from 'worker_threads';

@Injectable()
export class SamAssistantService {
    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, 
    })

    async createThreadService(){
        return await createThreadUseCae(this.openai);
    }

    async createMessageService(questionDto:QuestionDto){
        const {threadId, questions} = questionDto;
        const message = await createMessageUseCase(this.openai, {threadId, questions});
        console.log({message});
        return message;
    } 


}
