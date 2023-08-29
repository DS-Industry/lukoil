import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { paymentProivder } from './payment.provider';
import { PaymentController } from './payment.controller';
import { EnvironmentModule } from '../environment/environment.module';

@Module({
  imports: [EnvironmentModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
