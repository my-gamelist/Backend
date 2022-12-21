import 'dotenv/config';
import '@/index';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import GameRoute from '@/routes/game.route';
import AccountRoute from '@/routes/account.route';
import ReviewRoute from '@/routes/review.route';
import AuthRoute from '@/routes/auth.route';

validateEnv();

const app = new App([new IndexRoute(), new GameRoute(), new AccountRoute(), new ReviewRoute(), new ReviewRoute(), new AuthRoute()]);

app.listen();
