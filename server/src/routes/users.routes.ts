import { UsersController } from '@/controllers/users.controller';
import { DolphRouteHandler } from '@dolphjs/dolph/classes';
import { Dolph } from '@dolphjs/dolph/common';

export class UserRouter extends DolphRouteHandler<Dolph> {
  constructor() {
    super();
    this.initRoutes();
  }

  path: string = '/v1/user';
  controller: UsersController = new UsersController();

  initRoutes(): void {
    this.router.put(`${this.path}/update-pics`, this.controller.updatePics);
  }
}
