import { mongoose } from '@dolphjs/dolph/packages';
import { AuthType } from '../types';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  otherName: string;
  pics: string;
  type: string;
  position: string;
  email: string;
  password: string;
  authType: typeof AuthType;
  otp: string;
  otpExpiry: Date;
  accountDisabled: boolean;
  emailVerified: boolean;
  companyName: string;
  licenseNo: string;
  officeAddr: string;
  startDate: Date;
  taxId: string;
  taxNo: string;
  balance: number;
  bank: string;
  accNo: string;
  createdAt: Date;
  updatedAt: Date;
  generateOtp: () => Promise<string>;
  doesPasswordMatch: (password: string) => Promise<boolean>;
}
