import { mongoose } from '@dolphjs/dolph/packages';
import { AccountTransactionProcessType } from './types';
import { UserModel } from '@/models';
import { TransactionClassType, TransactionStatus } from '@/models/types';
import { ITransactionMetaData, ITransactions } from '@/models/interfaces/transactions_interface.model';
import { currencies } from '../helpers';
import { TransactionModel } from '@/models/transaction.model';

const debitUserWallet = (userId: string, transactionId: string, amount: number, session?: mongoose.ClientSession) => {
  if (session) {
    return UserModel.findByIdAndUpdate(
      userId,
      {
        $inc: { balance: -amount },
        lastTransactionRef: transactionId,
      },
      { session },
    );
  } else {
    return UserModel.findByIdAndUpdate(userId, {
      $inc: { balance: -amount },
      lastTransactionRef: transactionId,
    });
  }
};

const createTransactionDocs = async (
  userId: string,
  amount: number,
  currentBalance: number,
  status: TransactionStatus,
  transactionId: string,
  transactionClass: TransactionClassType,
  description: string,
  metaData: ITransactionMetaData,
  currency: currencies,
  session?: mongoose.ClientSession,
) => {
  const data = {
    userId,
    currentBalance,
    currency,
    status,
    transactionId,
    transactionClass,
    description,
    metaData,
    amount,
  };

  if (session) {
    return TransactionModel.create([data], { session });
  } else {
    return TransactionModel.create(data);
  }
};

export const processAccountDebit = async (
  {
    userId,
    currentBalance,
    amount,
    reference,
    description,
    status,
    transactionClass,
    metaData,
  }: AccountTransactionProcessType,
  session?: mongoose.ClientSession,
) => {
  await debitUserWallet(userId, reference, amount, session ? session : null);

  const data = await createTransactionDocs(
    userId,
    amount,
    currentBalance,
    status,
    reference,
    transactionClass,
    description,
    metaData,
    'ngn',
    session ? session : null,
  );

  return data;
};
