import { Module } from '@nestjs/common';
import { SignUpModule } from './sign-up/sign-up.module';

@Module({
  imports: [SignUpModule],
})
export class AppModule {}
