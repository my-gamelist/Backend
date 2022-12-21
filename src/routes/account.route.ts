import { Router } from 'express';
import AccountController from '@/controllers/account.controller';

export default class AccountRoute {
  public path: string;
  public router: Router;
  public accountController: AccountController;

  constructor() {
    this.path = '/api/account';
    this.router = Router();
    this.accountController = new AccountController();

    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.get(`${this.path}/:accountId`, this.accountController.getUser);
  }
}
