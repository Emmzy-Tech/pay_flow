import { UserModel } from '@/models';
import { IUser } from '@/models/interfaces';
import { DolphServiceHandler } from '@dolphjs/dolph/classes';
import { Dolph } from '@dolphjs/dolph/common';
import { InjectMongo } from '@dolphjs/dolph/decorators';
import { mongoose } from '@dolphjs/dolph/packages';

@InjectMongo('userModel', UserModel)
export class UserService extends DolphServiceHandler<Dolph> {
  userModel!: mongoose.Model<IUser, mongoose.PaginateModel<IUser>>;

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
}
