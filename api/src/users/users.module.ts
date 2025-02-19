import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';
import { HttpErrorHandlerService } from 'src/common/http-error-handler.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService, HttpErrorHandlerService],
})
export class UsersModule {}
