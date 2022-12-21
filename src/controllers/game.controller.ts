import GameService from '@/services/game.service';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger';

class GameController {
  public gameService = new GameService();

  public getTotalGames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const totalGames = await this.gameService.getTotalGames();

      res.status(200).json(totalGames);
    } catch (error) {
      next(error);
    }
  };

  public getGameDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const gameID = req.params.gameID;

      const gameData = await this.gameService.getGameDetail(gameID);

      res.status(200).json(gameData);
    } catch (error) {
      next(error);
    }
  };

  public getGamesBySteamRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      console.log(query);
      const games = await this.gameService.getGamesBySteamRating(query['page']);

      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  }
}

export default GameController;
