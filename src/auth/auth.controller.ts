import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('signin')
  signIn(@Query('phoneNumber') phoneNumber: string) {
    return this.authService.signIn(phoneNumber);
  }

  @Post('onboard')
  onboardCustomer(@Body() customerData: any) {
    return this.authService.onboardCustomer(customerData.phoneNumber, customerData);
  }
}
