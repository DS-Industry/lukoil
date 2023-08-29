import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { CarWashModule } from '../carWash/carWash.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CarWashModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
