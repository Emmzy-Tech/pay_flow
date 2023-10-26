import { mongoose, transformDoc } from '@dolphjs/dolph/packages';
import { user } from './constants/collection_names.models';
import paginate = require('mongoose-paginate-v2');
import { IUser } from './interfaces';
import { generateRandomNumbers } from '@/utils';
import { compareWithBcryptHash, hashWithBcrypt } from '@dolphjs/dolph/utilities';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 2,
    },
    lastName: {
      type: String,
      minlength: 2,
    },
    otherName: {
      type: String,
      minlength: 2,
    },
    pics: {
      type: String,
    },
    position: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    authType: {
      type: String,
      enum: ['login', 'google'],
      default: 'login',
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    accountDisabled: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    companyName: {
      type: String,
      minlength: 2,
    },
    licenseNo: {
      type: String,
    },
    officeAddr: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    taxId: {
      type: String,
    },
    taxNo: {
      type: String,
    },
  },
  { timestamps: true, collection: user },
);

UserSchema.plugin(transformDoc);
UserSchema.plugin(paginate);

UserSchema.methods.generateOtp = async function () {
  const user = this as IUser;
  const otp = generateRandomNumbers(0, 10, 4);
  user.otp = (await hashWithBcrypt({ pureString: otp, salt: 11 })).toString();
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();
  return otp;
};

UserSchema.methods.doesPasswordMatch = async function (password: string): Promise<boolean> {
  const user = this as IUser;
  return compareWithBcryptHash({ pureString: password, hashString: user.password });
};

export const UserModel: mongoose.PaginateModel<IUser> = mongoose.model<IUser, mongoose.PaginateModel<IUser>>(
  user,
  UserSchema,
);
