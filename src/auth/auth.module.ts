import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { JwtStrategy} from './jwt.strategy';
import { AuthController } from './auth.controller';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s'},
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
