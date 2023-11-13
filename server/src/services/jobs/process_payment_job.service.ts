import { mongoose } from '@dolphjs/dolph/packages';
import { PaymentType } from './types';
import { configs } from '@/configs';
import { generateTransactionId } from '@/utils';
import { Opay } from '../helpers';
import { processAccountDebit } from './process_acc_debit_job.service';
import { InternalServerErrorException } from '@dolphjs/dolph/common';

export const processPayment = async ({
  userId,
  amount,
  currentBalance,
  receiver,
  employeeId,
  bank,
  accountNo,
  receivingUserId,
}: PaymentType) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const reference = `${new Date().getTime()}_${configs.opay.id}`;

  const transactionReference = generateTransactionId(userId);

  try {
    const creditAccount = await new Opay().sendToBank({
      reference,
      amount,
      currency: 'NGN',
      country: 'NG',
      reason: 'payment for montly salary',
      receiver,
    });

    console.info(creditAccount);

    if (!creditAccount) throw new InternalServerErrorException('cannot process request');

    const description = `account debited to pay user ${userId}`;

    const transactionData = await processAccountDebit(
      {
        userId,
        currentBalance,
        amount,
        employeeId,
        reference: transactionReference,
        description,
        status: 'pending',
        transactionClass: 'money_out',
        metaData: {
          bankFrom: bank,
          bankTo: accountNo,
          to: receivingUserId,
        },
      },
      session,
    );

    const result: unknown = await session.commitTransaction();

    if (result) {
      // create notification and send an email
      console.log('======result======');
      console.log(result);
    }

    await session.endSession();
    return transactionData;
  } catch (e: any) {
    console.error('Error: ', e.message);
    throw e;
  }
};
