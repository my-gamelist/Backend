import passport from 'passport';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import AuthController from '@/controllers/auth.controller';

export default class AuthRoute implements Routes {
  public path = '/api/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.authController.register);
    this.router.post(`${this.path}/login`, passport.authenticate('local'), this.authController.login);
    this.router.post(`${this.path}/logout`, this.authController.logout);
  }
}
