import { mongoose } from '@dolphjs/dolph/packages';
import { IUser } from './user_interface.models';
import { TransactionClassType, TransactionStatus, TransactionType } from '../types';

export interface ITransactionMetaData {
  bankFrom: string;
  bankTo: string;
  to: IUser['_id'];
}

export interface ITransactions extends mongoose.Document {
  userId: IUser['_id'];
  amount: number;
  currentBalance: number;
  type: TransactionType;
  transactionId: string;
  transactionClass: TransactionClassType;
  metaData: ITransactionMetaData;
  status: TransactionStatus;
  currency: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
