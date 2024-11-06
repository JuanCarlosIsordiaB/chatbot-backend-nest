import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { checkComplteStatusUseCase, createRunUseCase, createThreadUseCae, getMessagesListUseCase } from './use-cases';
import { QuestionDto } from './dtos/question.dto';
import { createMessageUseCase } from './use-cases/create-message.use-case';


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
        const run = await createRunUseCase(this.openai, {threadId});
        await checkComplteStatusUseCase(this.openai, {threadId, runId: run.id});
        
        const messages = await getMessagesListUseCase(this.openai, {threadId});

        return messages;
    } 


}
