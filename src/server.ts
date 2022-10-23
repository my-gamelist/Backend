import 'dotenv/config';
import '@/index'
import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import gameDetailroute from '@/routes/gameDetail.route'
import reviewDetailroute from '@/routes/reviewDetail.route'
validateEnv();


const app = new App([new IndexRoute(), new gameDetailroute(), new reviewDetailroute]);
app.listen();
