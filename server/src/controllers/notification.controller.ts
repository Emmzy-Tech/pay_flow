import { configs } from '@/configs';
import { AppServices } from '@/services/app';
import { DolphControllerHandler, JWTAuthVerifyDec } from '@dolphjs/dolph/classes';
import {
  BadRequestException,
  Dolph,
  InternalServerErrorException,
  SuccessResponse,
  TryCatchAsyncDec,
  UnauthorizedException,
  DRequest,
  DResponse,
  NotFoundException,
} from '@dolphjs/dolph/common';

const services = new AppServices();

export class NotificationController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async getNotifications(req: DRequest, res: DResponse) {
    const { limit, page, query } = req.query;

    const notifications = await services.notificationService.getNotifications(+limit, +page, query?.toString());

    if (!notifications?.docs?.length) throw new NotFoundException('there are no notifications for user yet');

    SuccessResponse({
      res,
      body: { status: 'success', message: 'user notifications fetched successfully', data: notifications },
    });
  }
}
