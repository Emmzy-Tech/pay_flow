import { UsersController } from '@/controllers/users.controller';
import { getEmployeeById, newEmployee, updateEmployee } from '@/validations';
import { DolphRouteHandler } from '@dolphjs/dolph/classes';
import { Dolph, reqValidatorMiddleware } from '@dolphjs/dolph/common';

export class UserRouter extends DolphRouteHandler<Dolph> {
  constructor() {
    super();
    this.initRoutes();
  }

  path: string = '/v1/user';
  controller: UsersController = new UsersController();

  initRoutes(): void {
    this.router.get(`${this.path}/employee/:id`, reqValidatorMiddleware(getEmployeeById), this.controller.getEmployeeById);

    this.router.post(`${this.path}/new-employee`, reqValidatorMiddleware(newEmployee), this.controller.addEmployee);

    this.router.put(`${this.path}/update-employee`, reqValidatorMiddleware(updateEmployee), this.controller.updateEmployee);
    this.router.put(`${this.path}/update-pics`, this.controller.updatePics);

    this.router.delete(`${this.path}/employee/:id`, reqValidatorMiddleware(getEmployeeById), this.controller.removeEmployee);
  }
}