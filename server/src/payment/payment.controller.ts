import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/req/create-payment-dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Logger } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger();
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Req() req: any, @Body() body: Omit<CreatePaymentDto, 'phone'>) {
    const { user } = req;
    const updatedBody: CreatePaymentDto = { ...body, phone: user.phone };
    const response = await this.paymentService.createPayment(updatedBody);
    this.logger.warn(response);
    return await this.paymentService.createPayment(updatedBody);
  }
}
