import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ProsConsDiscusserDto, SpellingDto } from './dtos';


@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('spelling-checker')
  spellingChecker(@Body() spellingDto: SpellingDto) {
    return this.gptService.spellingChecker(spellingDto);
  }


  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto){
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }
 
  
}
