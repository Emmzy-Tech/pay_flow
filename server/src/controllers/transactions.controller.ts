import { configs } from '@/configs';
import { AppServices } from '@/services/app';
import { DolphControllerHandler, JWTAuthVerifyDec } from '@dolphjs/dolph/classes';
import { Dolph, SuccessResponse, TryCatchAsyncDec } from '@dolphjs/dolph/common';
import { Request, Response } from 'express';

const services = new AppServices();

export class TransactionController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async payEmployee(req: Request, res: Response) {
    //@ts-expect-error
    const { payload } = req;

    const paymentData = await services.transactionService.processPayment(payload.sub, req.body.employeeId, req.body.amount);

    SuccessResponse({ res, body: { data: paymentData, status: 'success', message: 'payment successful' } });
  }
}
