import { Injectable } from '@nestjs/common';
import { spellingCheckerUseCase } from './use-cases';
import { SpellingDto } from './dtos';
import OpenAI from 'openai';


@Injectable()
export class GptService {

  private openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  

  // Solo va a llamar casos de uso

  async spellingChecker(spellingDto: SpellingDto){
    return await spellingCheckerUseCase(this.openai, {prompt: spellingDto.prompt}); ;
  }
}
