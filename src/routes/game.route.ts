import { Router } from 'express';
import GameController from '@/controllers/game.controller';
import { Routes } from '@/interfaces/routes.interface';

export default class GameRoute implements Routes {
  public path: string;
  public router: Router;
  public gameController: GameController;

  constructor() {
    this.path = '/game';
    this.router = Router();
    this.gameController = new GameController();

    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.get(`${this.path}/top`, this.gameController.getGamesBySteamRating);
    this.router.get(`${this.path}/:gameID`, this.gameController.getGameDetail);
  }
}
