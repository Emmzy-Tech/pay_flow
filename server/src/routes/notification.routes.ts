import { NotificationController } from '@/controllers/notification.controller';
import { getNotifications } from '@/validations';
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
    this.router.get(`${this.path}/`, reqValidatorMiddleware(getNotifications), this.controller.getNotifications);
    this.router.get(`${this.path}/`, this.controller.getNotifications);
    this.router.get(`${this.path}/`, this.controller.getNotifications);
  }
}
