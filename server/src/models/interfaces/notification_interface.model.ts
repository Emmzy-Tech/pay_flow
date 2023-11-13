import { mongoose } from '@dolphjs/dolph/packages';
import { IUser } from './user_interface.models';

export interface INotification extends mongoose.Document {
  subject: string;
  userId: IUser['_id'];
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
