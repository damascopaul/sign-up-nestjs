import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ReqBodyValidationException } from './sign-up.exceptions';

@Catch(ReqBodyValidationException)
export class ReqBodyValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ReqBodyValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      error: exception.cause,
      message: exception.message,
      fieldErrors: exception.fieldErrors,
    });
  }
}
