import { AuthRouter } from './auth.routes';
import { UserRouter } from './users.routes';

const routes = [new AuthRouter(), new UserRouter()];
export default routes;
