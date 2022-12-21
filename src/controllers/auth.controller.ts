import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth.service';
import { logger } from '@/utils/logger';

export default class AuthController {
  public authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Login successful' });
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout(err => {
      if (err) {
        logger.error(err);
        return next(err);
      }
    });
    res.json({ message: 'Logout successful' });
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    this.authService
      .register(req.body)
      .then(result => {
        if (result) {
          res.json({ message: 'Register successful' });
        } else {
          res.json({ message: 'Register failed' });
        }
      })
      .catch(error => {
        res.json({ message: 'Register failed' });
      });
  };
}
