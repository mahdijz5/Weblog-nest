import { CreatePaymentParams } from './../../../utils/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
    setPayment(data : CreatePaymentParams) {
        return data
    }
}
