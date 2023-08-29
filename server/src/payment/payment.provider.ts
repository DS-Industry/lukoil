import { Provider } from '@nestjs/common';
import { YooCheckout } from '@a2seven/yoo-checkout';
export const PaymentToken = 'YOOKASSA';

export const paymentProivder: Provider = {
  provide: PaymentToken,
  useValue: YooCheckout,
};
