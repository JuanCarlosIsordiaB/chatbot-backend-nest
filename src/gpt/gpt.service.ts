import { Injectable } from '@nestjs/common';
import { prosConsDiscusserUseCase, spellingCheckerUseCase } from './use-cases';
import { ProsConsDiscusserDto, SpellingDto } from './dtos';
import OpenAI from 'openai';


@Injectable()
export class GptService {

  private openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  

  // Solo va a llamar casos de uso

  async spellingChecker(spellingDto: SpellingDto){
    return await spellingCheckerUseCase(this.openai, {prompt: spellingDto.prompt}); ;
  }



  async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto){
    return await prosConsDiscusserUseCase(this.openai, {prompt: prosConsDiscusserDto.prompt});
  }
}
