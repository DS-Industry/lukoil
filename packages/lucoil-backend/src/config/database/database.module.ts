import { Module } from '@nestjs/common';
import { DataBaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from '../../environment/environment.module';
import { EnvironmentService } from '../../environment/environment.service';
import { Order } from '../../order/order.entity';
import { User } from '../../user/user.entity';
import { Otp } from '../../auth/entity/otp.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useFactory: (env: EnvironmentService) => ({
        type: 'oracle',
        host: env.getDBCredentials().host,
        port: env.getDBCredentials().port,
        username: env.getDBCredentials().username,
        password: env.getDBCredentials().password,
        sid: env.getDBCredentials().sid,
        synchronize: false,
        entities: [Order, User, Otp],
      }),
      inject: [EnvironmentService],
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
