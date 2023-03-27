import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment/payment.controller';
import { PaymentService } from './services/payment/payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
