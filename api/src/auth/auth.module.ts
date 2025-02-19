import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpErrorHandlerService } from 'src/common/http-error-handler.service';

@Module({
  providers: [AuthService, HttpErrorHandlerService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
