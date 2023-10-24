import { DolphServiceHandler } from '@dolphjs/dolph/classes';
import { Dolph } from '@dolphjs/dolph/common';
import { InjectServiceHandler } from '@dolphjs/dolph/decorators';
import { UserService } from './user.service';

const services = [{ serviceHandler: UserService, serviceName: 'userService' }];

@InjectServiceHandler(services)
export class AppServices extends DolphServiceHandler<Dolph> {
  constructor() {
    super('appService');
  }

  userService!: UserService;
}
