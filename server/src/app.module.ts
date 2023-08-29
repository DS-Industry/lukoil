import { Module } from '@nestjs/common';
import { CarWashModule } from './carWash/carWash.module';
import { OrderModule } from './order/order.module';
import { EnvironmentModule } from './environment/environment.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './frameworks/bcrypt/bcrypt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtTokenModule } from './frameworks/jwt/jwt-token.module';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    PassportModule.register({}),
    JwtTokenModule,
    CarWashModule,
    OrderModule,
    AuthModule,
    EnvironmentModule,
    BcryptModule,
    DatabaseModule,
    UserModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
