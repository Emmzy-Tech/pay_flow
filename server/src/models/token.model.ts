import { mongoose, transformDoc } from '@dolphjs/dolph/packages';
import { token, user } from './constants/collection_names.models';

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: user,
    },
    type: {
      type: String,
      default: 'access',
      enum: ['access', 'refresh'],
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, collection: token },
);

TokenSchema.plugin(transformDoc);

export const TokenModel = mongoose.model(token, TokenSchema);
