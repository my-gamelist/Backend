import { logger } from "@/utils/logger";
import prisma from "@/databases/postgreClient";
import { Prisma } from '@prisma/client'
import { Game } from '@/interfaces/game.interface';


export default class gameDetailService{

    public async getGameDetail(gameID){
        // const game = await prisma.$queryRaw<Game>(Prisma.sql
        //     `
        //     SELECT *
        //     FROM game
        //     WHERE app_id = ${gameID};
        //     `)
        const game = await prisma.game.findUnique({
            where: {
                appId: Number(gameID)
            }
        });
        
        return game;
    }

}
