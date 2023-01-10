import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth.service';
import { logger } from '@/utils/logger';

export default class AuthController {
  public authService = new AuthService();

  public check = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      res.json({ message: 'Authenticated' });
    } else {
      res.json({ message: 'Unauthenticated' });
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    // set session
    req.session.username = req.body.username;
    req.session.session = req.sessionID;

    // set cookie
    res.cookie('username', req.body.username, { maxAge: 900000, httpOnly: true });
    res.cookie('session', req.sessionID, { maxAge: 900000, httpOnly: true });

    res.json({ message: 'Login successful' });
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout(err => {
      if (err) {
        logger.error(err);
        return next(err);
      }
    });
    req.session.destroy(err => {
      if (err) {
        logger.error(err);
        return next(err);
      }
    });
    
    res.clearCookie('username');
    res.clearCookie('session');

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
