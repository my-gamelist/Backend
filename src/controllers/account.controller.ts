import AccountService from '@/services/account.service';
import { NextFunction, Request, Response } from 'express';

export default class AccountController {
  public accountService = new AccountService();

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = req.params.accountId;
      const userData = await this.accountService.getUser(accountId);

      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };
}
