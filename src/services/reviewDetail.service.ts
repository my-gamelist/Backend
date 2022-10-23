import { logger } from "@/utils/logger";
import prisma from "@/databases/postgreClient";
import { Prisma } from '@prisma/client'
import { Game } from '@/interfaces/game.interface';


export default class reviewDetailService{

    public async getReviewDetail(reviewID){

        const review = await prisma.review.findUnique({
            where: {
                reviewId: Number(reviewID)
            }
        });
        
        return review;
    }

}
