import 'dotenv/config';
import '@/index'
import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import gameDetailroute from '@/routes/gameDetail.route'
validateEnv();


const app = new App([new IndexRoute(), new gameDetailroute()]);

app.listen();
