import { DolphServiceHandler } from '@dolphjs/dolph/classes';
import {
  BadRequestException,
  Dolph,
  InternalServerErrorException,
  NotFoundException,
  SuccessResponse,
} from '@dolphjs/dolph/common';
import { InjectMongo } from '@dolphjs/dolph/decorators';
import { NotificationModel, UserModel } from '@/models';
import { mongoose } from '@dolphjs/dolph/packages';
import { INotification, IUser } from '@/models/interfaces';

@InjectMongo('userModel', UserModel)
@InjectMongo('notificationModel', NotificationModel)
export class NotificationService extends DolphServiceHandler<Dolph> {
  userModel!: mongoose.Model<IUser, mongoose.PaginateModel<IUser>>;
  notificationModel!: mongoose.Model<INotification, mongoose.PaginateModel<INotification>>;

  constructor() {
    super('notificationService');
  }
}
