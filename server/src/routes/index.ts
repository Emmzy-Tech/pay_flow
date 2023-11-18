import { Router } from 'express';
import { AuthRouter } from './auth.routes';
import { NotificationRouter } from './notification.routes';
import { TransactionRouter } from './transaction.routes';
import { UserRouter } from './users.routes';

const routes = [new AuthRouter(), new UserRouter(), new TransactionRouter(), new NotificationRouter()];
export default routes;
