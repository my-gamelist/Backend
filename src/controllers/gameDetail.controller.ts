import gameDetailService from '@/services/gameDetail.service'
import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger'

class gameDetailController{

    public gameService = new gameDetailService()
    
    public getGameDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try{
            const gameID = req.params.gameID;
            // logger.info(gameID);

            const gameData = await this.gameService.getGameDetail(gameID as unknown as number);
            
            logger.info(gameData);

            res.status(200).json(gameData);
        
        }
        catch (error) {
            next(error);
        }

    }


}

export default gameDetailController