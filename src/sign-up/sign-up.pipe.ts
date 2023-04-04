import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';
import { ReqBodyValidationException } from './sign-up.exceptions';

@Injectable()
export class RequestBodyValidationPipe implements PipeTransform {
  private schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .max(254),
    mobile: Joi.string()
      .regex(/^(09|\+639)\d{9}$/)
      .required()
      .messages({
        'string.pattern.base': '"mobile" is not a valid mobile number',
      }),
    password: Joi.string()
      .regex(
        /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z]).*$/,
      )
      .required()
      .min(8)
      .max(254)
      .messages({
        'string.pattern.base': '"password" is not a valid password',
      }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, _metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      const errors = error.details.map((e) => ({
        name: e.path[0] as string,
        message: e.message,
      }));
      throw new ReqBodyValidationException(errors);
    }
    return value;
  }
}
