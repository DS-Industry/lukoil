import { Module } from '@nestjs/common';
import { CarWashModule } from './carWash/carWash.module';
import { OrderModule } from './order/order.module';
import { EnvironmentModule } from './environment/environment.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtTokenModule } from './frameworks/jwt/jwt-token.module';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    JwtTokenModule,
    CarWashModule,
    OrderModule,
    AuthModule,
    EnvironmentModule,
    DatabaseModule,
    UserModule,
    PaymentModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          customSuccessMessage(req, res) {
            return `${req.method} [${req.url}] || ${res.statusMessage}`;
          },
          customErrorMessage(req, res, error) {
            return `${req.method} [${req.url}] || ${error.message}`;
          },
          serializers: {
            req(req) {
              req.body = req.raw.body;
              return req;
            },
          },
          transport: {
            targets: [
              {
                target: 'pino-pretty',
                options: {
                  levelFirst: true,
                  translateTime: 'SYS:dd/mm/yyyy, h:MM:ss.l o',
                },
                level: 'info',
              },
              {
                target: '@logtail/pino',
                options: { sourceToken: config.get('LOGTAIL_TOKEN') },
                level: 'info',
              },
            ],
          },
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
