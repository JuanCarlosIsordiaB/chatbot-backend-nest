import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { GptService } from './gpt.service';
import { ProsConsDiscusserDto, SpellingDto, TextToAudioDto, TranslateDto } from './dtos';
import type { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('spelling-checker')
  spellingChecker(@Body() spellingDto: SpellingDto) {
    return this.gptService.spellingChecker(spellingDto);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.prosConsDicusserStream(prosConsDiscusserDto);
    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK); // 200

    for await (const chunck of stream) {
      const piece = chunck.choices[0].delta.content || '';
      //console.log(piece);
      res.write(piece);
    }

    res.end();
  }

  @Post('translate')
  traductorController(@Body() translateDto: TranslateDto) {
    return this.gptService.translateService(translateDto);
  }

  @Post('text-to-audio')
  async textToAudioController(@Body() textToAudioDto:TextToAudioDto, @Res() res:Response) {
    const filePath = await this.gptService.textToAudioService(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK); // 200
    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(@Res() res:Response, @Param('fileId') fileId: string) {
    const filePath = await this.gptService.textToAudioGetter(fileId);

    
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK); // 200
    res.sendFile(filePath);
  }
}
