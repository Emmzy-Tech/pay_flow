import { DolphServiceHandler } from '@dolphjs/dolph/classes';
import { Dolph } from '@dolphjs/dolph/common';
import { InjectServiceHandler } from '@dolphjs/dolph/decorators';
import { UserService } from './user.service';
import { TransactionService } from './transactions.service';

const services = [
  { serviceHandler: UserService, serviceName: 'userService' },
  { serviceHandler: TransactionService, serviceName: 'transactionService' },
];

@InjectServiceHandler(services)
export class AppServices extends DolphServiceHandler<Dolph> {
  constructor() {
    super('appService');
  }

  userService!: UserService;
  transactionService!: TransactionService;
}
