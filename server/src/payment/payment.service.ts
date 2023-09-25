import { Injectable, Logger } from '@nestjs/common';
import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';
import { v4 as uuidv4 } from 'uuid';
import { CreatePaymentDto } from './dto/req/create-payment-dto';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class PaymentService {
  private checkout;
  private readonly logger = new Logger();
  constructor(env: EnvironmentService) {
    this.checkout = new YooCheckout({
      shopId: '168905',
      secretKey: env.getPaymentApiKey(),
    });
  }

  async createPayment(data: CreatePaymentDto) {
    const paymentInfo: ICreatePayment = {
      amount: {
        value: String(data.amount),
        currency: 'RUB',
      },
      receipt: {
        phone: data.phone,
        items: [
          {
            description: 'Заказ №' + uuidv4(),
            amount: {
              value: String(data.amount),
              currency: 'RUB',
            },
            quantity: '1',
            vat_code: 4,
          },
        ],
      },
      confirmation: {
        type: 'embedded',
      },
      capture: true,
      merchant_customer_id: data.id,
    };

    try {
      return await this.checkout.createPayment(paymentInfo, uuidv4());
    } catch (e) {
      this.logger.error(e);
      console.log(e);
    }
  }
}
