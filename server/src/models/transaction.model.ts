import { mongoose, transformDoc } from '@dolphjs/dolph/packages';
import { transaction, user } from './constants/collection_names.models';
import paginate = require('mongoose-paginate-v2');
import { ITransactions } from './interfaces/transactions_interface.model';

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    transactionClass: {
      type: String,
      required: true,
      enum: ['charge', 'money_in', 'money_out'],
    },
    metaData: {
      bankFrom: {
        type: String,
        required: true,
      },
      bankTo: {
        type: String,
        required: true,
      },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: user,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    currency: {
      type: String,
      enum: ['usd', 'ngn', 'eur', 'pounds'],
      default: 'ngn',
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: transaction },
);

TransactionSchema.plugin(transformDoc);
TransactionSchema.plugin(paginate);

export const TransactionModel: mongoose.PaginateModel<ITransactions> = mongoose.model<
  ITransactions,
  mongoose.PaginateModel<ITransactions>
>(transaction, TransactionSchema);
