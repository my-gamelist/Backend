import 'dotenv/config';
import '@/index';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import GameRoute from '@/routes/game.route';
import AccountRoute from '@/routes/account.route';
validateEnv();

const app = new App([new IndexRoute(), new GameRoute(), new AccountRoute()]);

app.listen();
