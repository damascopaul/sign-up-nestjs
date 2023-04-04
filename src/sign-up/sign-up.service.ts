import { Injectable } from '@nestjs/common';
import { RequestBody } from './interfaces/requestBody';

@Injectable()
export class SignUpService {
  createUser(payload: RequestBody): string {
    console.debug(`Creating user: ${JSON.stringify(payload, null, 2)}`);
    return '{"message": "ok"}';
  }
}
