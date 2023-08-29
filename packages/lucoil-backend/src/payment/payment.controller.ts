import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/req/create-payment-dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Req() req: any, @Body() body: Omit<CreatePaymentDto, 'phone'>) {
    const { user } = req;
    const updatedBody: CreatePaymentDto = { ...body, phone: user.phone };
    return await this.paymentService.createPayment(updatedBody);
  }
}
