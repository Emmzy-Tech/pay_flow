import { configs } from '@/configs';
import { tempStore } from '@/constants';
import { AppServices } from '@/services/app';
import { DolphControllerHandler, JWTAuthVerifyDec } from '@dolphjs/dolph/classes';
import { Dolph, NotFoundException, SuccessResponse, TryCatchAsyncDec, DRequest, DResponse } from '@dolphjs/dolph/common';

const services = new AppServices();

export class TransactionController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async payEmployee(req: DRequest, res: DResponse) {
    const { payload } = req;

    const paymentData = await services.transactionService.processPayment(
      payload.sub.toString(),
      req.body.employeeId,
      req.body.amount,
    );

    if (paymentData) {
      const notification = {
        subject: 'Payment of Salary',
        userId: payload.sub.toString(),
        type: 'Payment',
        message: `${req.body.employeeId} has been paid their monthly salary of ${req.body.amount}`,
      };
      await services.notificationService.createNotification(notification);
      tempStore.push(notification);
    }

    SuccessResponse({ res, body: { data: paymentData, status: 'success', message: 'payment successful' } });
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async getTransactionHistory(req: DRequest, res: DResponse) {
    const transactions = await services.transactionService.getTransactionHistory(req.query?.keyword?.toString());

    if (!transactions.length) throw new NotFoundException('there are no transactions yet');

    SuccessResponse({
      res,
      body: { data: transactions, status: 'success', message: 'transaction history fetched successfully' },
    });
  }
}
