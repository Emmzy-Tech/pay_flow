import { AuthRouter } from './auth.routes';
import { TransactionRouter } from './transaction.routes';
import { UserRouter } from './users.routes';

const routes = [new AuthRouter(), new UserRouter(), new TransactionRouter()];
export default routes;
