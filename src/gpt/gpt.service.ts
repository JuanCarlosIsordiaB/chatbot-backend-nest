import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase, spellingCheckerUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { ProsConsDiscusserDto, SpellingDto, TextToAudioDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Solo va a llamar casos de uso

  async spellingChecker(spellingDto: SpellingDto) {
    return await spellingCheckerUseCase(this.openai, {
      prompt: spellingDto.prompt,
    });
  }

  async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  async prosConsDicusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  async translateService({prompt, lang}: TranslateDto) {
    return await translateUseCase(this.openai, {prompt, lang});
  }

  async textToAudioService({prompt,voice}: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, {prompt, voice});
  }


  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(__dirname, '../../generated/audios/',`${fileId}.mp3`);
    
    const wasFound = fs.existsSync(filePath);
    if(!wasFound) throw new NotFoundException('File not found');
    return filePath;
  }
}
