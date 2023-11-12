import { NotificationController } from '@/controllers/notification.controller';
import { DolphRouteHandler } from '@dolphjs/dolph/classes';
import { Dolph, reqValidatorMiddleware } from '@dolphjs/dolph/common';

export class NotificationRouter extends DolphRouteHandler<Dolph> {
  constructor() {
    super();
    this.initRoutes();
  }

  path: string = '/v1/notifications';
  controller: NotificationController = new NotificationController();

  initRoutes(): void {
    this.router.get(`${this.path}/`, this.controller.getNotifications);
  }
}
