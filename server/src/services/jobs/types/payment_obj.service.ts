import { IUser } from '@/models/interfaces';
import { ITransactionMetaData } from '@/models/interfaces/transactions_interface.model';
import { TransactionClassType, TransactionStatus } from '@/models/types';
import { ReciverType } from '@/services/helpers';

export type PaymentType = {
  userId: string;
  amount: number;
  currentBalance: number;
  receiver: ReciverType;
  bank: string;
  accountNo: string;
  receivingUserId: IUser['_id'];
};
export type AccountTransactionProcessType = {
  userId: IUser['_id'];
  currentBalance: number;
  amount: number;
  reference: string;
  description: string;
  status: TransactionStatus;
  transactionClass: TransactionClassType;
  metaData: ITransactionMetaData;
};
