import { Controller, Get, OnModuleInit, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('login')
  async login() {
    return await this.authService.redirectToAuth();
  }

  @Get('callback')
  async handleOAuthCallback(@Query('code') authCode: string) {
    if (!authCode) {
      return 'No auth code provided';
    }
    await this.authService.fetchAuthToken(authCode);
    return { message: 'Authentication successful' };
  }

  // For testing purposes
  @Get('test-refresh')
  async testRefresh() {
    return await this.authService.refreshAuthToken();
  }
}
