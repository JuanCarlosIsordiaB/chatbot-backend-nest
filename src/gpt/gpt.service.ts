import { Injectable } from '@nestjs/common';
import { spellingCheckerUseCase } from './use-cases';


@Injectable()
export class GptService {
  

  // Solo va a llamar casos de uso

  async spellingChecker(){
    return await spellingCheckerUseCase() ;
  }
}
