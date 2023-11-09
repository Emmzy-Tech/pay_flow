import { configs } from '@/configs';
import { mediaParserOptions } from '@/constants';
import { sterilizeUser } from '@/helpers';
import { AppServices } from '@/services/app';
import { uploadOneToCloud } from '@/services/helpers';
import { DolphControllerHandler, JWTAuthVerifyDec } from '@dolphjs/dolph/classes';
import {
  Dolph,
  InternalServerErrorException,
  NotFoundException,
  SuccessResponse,
  TryCatchAsyncDec,
} from '@dolphjs/dolph/common';
import { MediaParser } from '@dolphjs/dolph/utilities';
import { Request, Response } from 'express';

const services = new AppServices();
export class UsersController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async getUserProfile(req: Request, res: Response) {
    //@ts-expect-error
    const user = await services.userService.findById(req.payload.sub);
    if (!user) throw new NotFoundException('user not found');

    SuccessResponse({ res, body: sterilizeUser(user) });
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  @MediaParser(mediaParserOptions)
  public async updatePics(req: Request, res: Response) {
    //@ts-expect-error
    const { file, payload } = req;
    const url = await uploadOneToCloud(file.path);

    if (!url) throw new InternalServerErrorException("cannot upload user's pics");

    const user = await services.userService.updateBylD(payload.sub, { pics: url });
    if (!user) throw new InternalServerErrorException('cannot process  request');

    SuccessResponse({ res, body: sterilizeUser(user) });
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async addEmployee(req: Request, res: Response) {
    const newEmployee = await services.userService.createEmployee(req.body);
    if (!newEmployee) throw new InternalServerErrorException('cannot process request');
    SuccessResponse({
      res,
      body: { data: newEmployee, msg: 'employee added successfully', status: 'success' },
      status: 201,
    });
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async updateEmployee(req: Request, res: Response) {
    const employee = await services.userService.updateEmployee(req.body.id, { ...req.body });
    if (!employee) throw new InternalServerErrorException('cannot process request');
    SuccessResponse({ res, body: { data: employee, msg: 'employee details updated', status: 'success' } });
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async getEmployeeById(req: Request, res: Response) {
    const employee = await services.userService.getEmployeeById(req.params.id);
    if (!employee) throw new NotFoundException('employee not found');
    SuccessResponse({ res, body: { data: employee, msg: "successfully fetched employee's data", status: 'success' } });
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async getEmployees(req: Request, res: Response) {
    const { limit, page, sortBy, orderBy, keyword } = req.query;
    const employees = await services.userService.getEmplyees(
      +limit || 10,
      +page || 1,
      sortBy?.toString() || 'asc',
      orderBy?.toString() || 'fullname',
      keyword?.toString(),
    );

    if (!employees) throw new NotFoundException('there are no employees yet');
    SuccessResponse({ res, body: { data: employees, msg: 'successfully fetched employees', status: 'success' } });
  }

  @TryCatchAsyncDec
  @JWTAuthVerifyDec(configs.jwt.secret)
  public async removeEmployee(req: Request, res: Response) {
    const employee = await services.userService.deleteEmployee(req.params.id);
    if (!employee) throw new NotFoundException('employee not found');
    SuccessResponse({ res, body: { msg: 'successfully removed employee from company database', status: 'success' } });
  }
}
