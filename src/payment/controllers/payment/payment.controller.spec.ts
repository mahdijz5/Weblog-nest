import { PaymentService } from './../../services/payment/payment.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentController } from './payment.controller';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  let requsetMock = <Request>{
    query : {}
  }

  let responseMock = {
    status : jest.fn((x) =>responseMock),
    json : jest.fn((x) => x)
  } as unknown as Response

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers : [PaymentService]
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status of 400', () => {
      controller.getPayment(requsetMock,responseMock)
    })
  })

  describe('createPayment', () => {
    it('should return a status of 400', () => {
      const response = controller.createPayment({"email" : "sd0",price : 123})
      // expect(response)./()\
      console.log(response)
    })
  })
});
