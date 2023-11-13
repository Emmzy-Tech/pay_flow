import { DolphServiceHandler } from '@dolphjs/dolph/classes';
import {
  BadRequestException,
  Dolph,
  InternalServerErrorException,
  NotFoundException,
  SuccessResponse,
} from '@dolphjs/dolph/common';
import { processPayment } from '../jobs/process_payment_job.service';
import { InjectMongo } from '@dolphjs/dolph/decorators';
import { UserService } from './user.service';
import { EmployeeModel, UserModel } from '@/models';
import { mongoose } from '@dolphjs/dolph/packages';
import { IEmployee, IUser } from '@/models/interfaces';
import { findBankByName } from '@/helpers/match_accout_code_to_name.helpers';
import { TransactionModel } from '@/models/transaction.model';
import { ITransactions } from '@/models/interfaces/transactions_interface.model';
import { employee, transaction } from '@/models/constants/collection_names.models';

@InjectMongo('userModel', UserModel)
@InjectMongo('employeeModel', EmployeeModel)
@InjectMongo('transactionModel', TransactionModel)
export class TransactionService extends DolphServiceHandler<Dolph> {
  userModel!: mongoose.Model<IUser, mongoose.PaginateModel<IUser>>;
  employeeModel!: mongoose.Model<IEmployee, mongoose.PaginateModel<IEmployee>>;
  transactionModel!: mongoose.Model<ITransactions, mongoose.PaginateModel<ITransactions>>;

  constructor() {
    super('transactionService');
  }

  public readonly processPayment = async (userId: string, employeeId: string, amount: number) => {
    const hrUser = await this.userModel.findById(userId);

    const employee = await this.employeeModel.findById(employeeId);

    if (!employee || !hrUser) throw new NotFoundException('cannnot find user account');

    const userBank = findBankByName(employee.bankName);

    if (!userBank) throw new BadRequestException('user bank is not supported by OPAY');

    if (amount >= hrUser.balance / 100) throw new BadRequestException('please top-up account before payment can proceed');

    const makePayment = await processPayment({
      userId,
      currentBalance: hrUser.balance,
      amount,
      accountNo: employee.accountNo,
      bank: employee.bankName,
      receiver: { name: employee.fullname, bankAccountNumber: employee.accountNo, bankCode: +userBank.code },
      receivingUserId: employee._id,
    });

    if (!makePayment) throw new InternalServerErrorException('cannot process request');

    console.info(makePayment);

    return makePayment;
  };

  public readonly getTransactionHistory = async (name: string) => {
    let transactions: any;

    if (!name?.length) {
      transactions = this.transactionModel.aggregate([
        {
          $lookup: {
            from: employee,
            localField: 'userId',
            foreignField: '_id',
            as: 'employeeData',
          },
        },

        {
          $unwind: '$employeeData',
        },
      ]);
    } else {
      transactions = this.transactionModel.aggregate([
        {
          $lookup: {
            from: employee,
            localField: 'userId',
            foreignField: '_id',
            as: 'employeeData',
          },
        },

        {
          $unwind: '$employeeData',
        },

        {
          $match: {
            'employeeData.fullname': {
              $regex: new RegExp(name, 'i'),
            },
          },
        },
      ]);
    }

    return transactions;
  };

  // this services is responsible for fetching metrics for application
  // TODO: implement it to work on filter i.e "monthly", "yearly" e.t.c.
  public readonly getmetrics = async () => {
    const transactions = await this.transactionModel.find();
    let totalPaid: number = 0;
    let totalPending: number = 0;
    let totalFailed: number = 0;

    transactions.map((trans) => {
      if (trans.status == 'success') {
        totalPaid += trans.amount;
      } else if (trans.status === 'pending') {
        totalPending += trans.amount;
      } else if (trans.status === 'failed') {
        totalFailed += trans.amount;
      }
    });

    return { totalFailed, totalPaid, totalPending };
  };
}
