import { TransactionController } from '@/controllers/transactions.controller';
import { payEmployee } from '@/validations';
import { DolphRouteHandler } from '@dolphjs/dolph/classes';
import { Dolph, reqValidatorMiddleware } from '@dolphjs/dolph/common';

export class TransactionRouter extends DolphRouteHandler<Dolph> {
  constructor() {
    super();
    this.initRoutes();
  }

  path: string = '/v1/transaction';
  controller: TransactionController = new TransactionController();

  initRoutes(): void {
    this.router.post(`${this.path}/payment`, reqValidatorMiddleware(payEmployee), this.controller.payEmployee);
    this.router.get(`${this.path}/history`, this.controller.getTransactionHistory);
  }
}
