import { CreatePaymentDto } from './../../dto/createPayment.dto';
import { PaymentService } from './../../services/payment/payment.service';
import { Controller, Get, Req, Res, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService :  PaymentService) {}

    @Get()
    getPayment(@Req() req : Request,@Res() res : Response) {
        const {limit,page} = req.query
        if(!limit || !page ) {
            res.status(400).json({"message" : "sdsad"})
        }else {
            res.send(200)
        }
    }

    @Post()
    createPayment(@Body() body : CreatePaymentDto) {
        return this.paymentService.setPayment(body)
    }


}
