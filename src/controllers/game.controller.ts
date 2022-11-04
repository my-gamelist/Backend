import GameService from '@/services/game.service';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger';

class GameController {
  public gameService = new GameService();

  public getGameDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const gameID = req.params.gameID;

      const gameData = await this.gameService.getGameDetail(gameID);

      res.status(200).json(gameData);
    } catch (error) {
      next(error);
    }
  };
}

export default GameController;
