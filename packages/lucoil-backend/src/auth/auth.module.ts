import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EnvironmentModule } from 'src/environment/environment.module';
import { JwtTokenModule } from 'src/frameworks/jwt/jwt-token.module';
import { BcryptModule } from 'src/frameworks/bcrypt/bcrypt.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entity/otp.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { HttpModule, HttpService } from '@nestjs/axios';
import { SmsProviderService } from './sms-provider.service';

@Module({
  imports: [
    EnvironmentModule,
    JwtTokenModule,
    BcryptModule,
    UserModule,
    TypeOrmModule.forFeature([Otp]),
    ConfigModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SmsProviderService],
  exports: [],
})
export class AuthModule {}
