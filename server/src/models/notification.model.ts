import { mongoose, transformDoc } from '@dolphjs/dolph/packages';
import { notification, user } from './constants/collection_names.models';
import paginate = require('mongoose-paginate-v2');
import { INotification } from './interfaces';

const NotificationSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: user,
      required: true,
    },
    type: {
      type: String,
      enum: ['payment', 'user'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: notification },
);

NotificationSchema.plugin(transformDoc);
NotificationSchema.plugin(paginate);

export const NotificationModel: mongoose.PaginateModel<INotification> = mongoose.model<
  INotification,
  mongoose.PaginateModel<INotification>
>(notification, NotificationSchema);
