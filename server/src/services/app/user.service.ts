import { EmployeeModel, UserModel } from '@/models';
import { IEmployee, IUser } from '@/models/interfaces';
import { DolphServiceHandler } from '@dolphjs/dolph/classes';
import { Dolph } from '@dolphjs/dolph/common';
import { InjectMongo } from '@dolphjs/dolph/decorators';
import { mongoose } from '@dolphjs/dolph/packages';

@InjectMongo('userModel', UserModel)
@InjectMongo('employeeModel', EmployeeModel)
export class UserService extends DolphServiceHandler<Dolph> {
  userModel!: mongoose.Model<IUser, mongoose.PaginateModel<IUser>>;
  employeeModel!: mongoose.Model<IEmployee, mongoose.PaginateModel<IEmployee>>;

  constructor() {
    super('userService');
  }

  public readonly create = async (data: any) => {
    return this.userModel.create(data);
  };

  public readonly find = async (query: any) => {
    return this.userModel.find(query);
  };

  public readonly findOne = async (query: any) => {
    return this.userModel.findOne(query);
  };

  public readonly findByEmail = async (email: string) => {
    return this.userModel.findOne({ email });
  };

  public readonly findById = async (id: any) => {
    return this.userModel.findById(id);
  };

  public readonly deleteById = async (id: any) => {
    return this.userModel.findByIdAndDelete(id);
  };

  public readonly updateByEmail = async (email: string, data: any) => {
    return this.userModel.updateOne({ email }, data, { new: true });
  };

  public readonly updateBylD = async (_id: string | mongoose.Types.ObjectId | any, data: any) => {
    return this.userModel.findOneAndUpdate({ _id }, data, { new: true });
  };

  public readonly getEmplyees = async (limit: number, page: number, sortBy: string, orderBy: string, keyword?: string) => {
    let filter: any = {};
    if (keyword?.length) {
      filter = { fullname: { $regex: keyword, $options: 'i' } };
    }

    const options = {
      limit,
      page,
      sort: { [orderBy]: sortBy === 'asc' ? 1 : -1 },
    };
    //@ts-expect-error
    return this.employeeModel.paginate(filter, options);
  };

  public readonly getEmployeeCount = async () => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const employeeCount = await this.employeeModel.find({}).countDocuments();
    const newEmployees = await this.employeeModel.find({ createdAt: { $gte: twentyFourHoursAgo } }).countDocuments();

    return { totalEmployees: employeeCount, newEmployeesCont: newEmployees };
  };

  public readonly createEmployee = async (body: any) => {
    body.amount = parseInt(body.amount).toFixed(2);
    return this.employeeModel.create(body);
  };

  public readonly updateEmployee = async (id: string, body: any) => {
    if (body.amount) body.amount = parseInt(body.amount).toFixed(2);
    return this.employeeModel.findByIdAndUpdate(id, body, { new: true });
  };

  public readonly getEmployeeById = async (id: string) => {
    return this.employeeModel.findById(id);
  };

  public readonly deleteEmployee = async (id: string) => {
    return this.employeeModel.findByIdAndDelete(id);
  };
}
