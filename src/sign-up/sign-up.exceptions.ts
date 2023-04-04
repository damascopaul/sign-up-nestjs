import { BadRequestException } from '@nestjs/common';
import { FieldError } from './interfaces/fieldError';

export class ReqBodyValidationException extends BadRequestException {
  fieldErrors: FieldError[];

  constructor(fieldErrors: Array<FieldError>) {
    super('Validation error');
    this.fieldErrors = fieldErrors;
  }
}
