import { mongoose } from '@dolphjs/dolph/packages';

export interface IEmployee extends mongoose.Document {
  fullname: string;
  accountNo: string;
  bankName: string;
  amount: number;
  currency: string;
  paymentFreq: string;
  createdAt: Date;
  updatedAt: Date;
}
