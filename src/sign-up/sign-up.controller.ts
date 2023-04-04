import {
  Body,
  Controller,
  Header,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { RequestBody } from './interfaces/requestBody';
import { RequestBodyValidationPipe } from './sign-up.pipe';
import { ReqBodyValidationExceptionFilter } from './sign-up.filter';

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('')
  @Header('Content-Type', 'application/json')
  @UseFilters(new ReqBodyValidationExceptionFilter())
  @UsePipes(new RequestBodyValidationPipe())
  signUp(@Body() payload: RequestBody): string {
    return this.signUpService.createUser(payload);
  }
}
