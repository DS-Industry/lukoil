import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import * as process from 'process';
import { JwtTokenService } from './jwt-token.service';
@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
