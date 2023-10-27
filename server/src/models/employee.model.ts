import { mongoose, transformDoc } from '@dolphjs/dolph/packages';
import { employee } from './constants/collection_names.models';
import paginate = require('mongoose-paginate-v2');
import { IEmployee } from './interfaces';

const EmployeeSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      minlength: [3, "employer's name can't be less than three characters"],
    },
    accountNo: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'ngn',
      enum: ['usd', 'eur', 'ngn', 'pounds'],
    },
    paymentFreq: {
      type: String,
      default: 'monthly',
      enum: ['weekly', 'monthly', '3-months', '6-months', 'yearly'],
    },
  },
  { timestamps: true, collection: employee },
);

EmployeeSchema.plugin(transformDoc);
EmployeeSchema.plugin(paginate);

export const EmployeeModel: mongoose.PaginateModel<IEmployee> = mongoose.model<IEmployee, mongoose.PaginateModel<IEmployee>>(
  employee,
  EmployeeSchema,
);
