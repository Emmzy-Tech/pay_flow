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

  public readonly createNotification = async (data: any) => {
    return this.notificationModel.create(data);
  };

  public readonly getNotifications = async (limit: number, page: number, query?: string) => {
    let filter: any = {};
    if (query?.length) {
      filter = { $or: [{ subject: { $regex: query, $options: 'i' } }, { message: { $regex: query, $options: 'i' } }] };
    }

    const options = {
      limit,
      page,
      sort: 'asc',
    };
    //@ts-expect-error
    return this.notificationModel.paginate(filter, options);
  };

  public readonly deleteNotification = async (id: string) => {
    return this.notificationModel.findByIdAndDelete(id);
  };
}
