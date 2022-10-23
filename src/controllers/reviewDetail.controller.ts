import reviewDetailService from '@/services/reviewDetail.service'
import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger'

class reviewDetailController{

    public reviewService = new reviewDetailService()
    
    public getReviewDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try{
            const reviewID = req.params.reviewID;
            const reviewData = await this.reviewService.getReviewDetail(reviewID);
            
            logger.info(reviewData);

            res.status(200).json(reviewData);
        
        }
        catch (error) {
            next(error);
        }

    }


}

export default reviewDetailController