import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RegistrationReqDto } from './dto/registration-req.dto';
import { LoginReqDto } from './dto/login-req.dto';
import { OtpReqDto } from './dto/otp-req.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle(5, 60)
  @Post('/register')
  async register(@Body() body: RegistrationReqDto) {
    const { phone, otp, partnerCard } = body;
    return await this.authService.register(phone, otp, partnerCard);
  }
  @Throttle(5, 60)
  @Post('login')
  async login(@Body() body: LoginReqDto) {
    const { phone, otp } = body;
    return await this.authService.singIn(phone, otp);
  }

  @Throttle(1, 60)
  @Post('/send/otp')
  async sendOtp(@Body() body: OtpReqDto) {
    const { phone } = body;
    return await this.authService.sendOtp(phone);
  }
  @UseGuards(JwtGuard)
  @Get('test-auth')
  async testAuth(@Req() req: any) {
    const { user } = req;

    return user;
  }
}
