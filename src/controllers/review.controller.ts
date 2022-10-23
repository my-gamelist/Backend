import ReviewService from '@/services/review.service';
import { NextFunction, Request, Response } from 'express';

class ReviewController {
  public reviewService = new ReviewService();

  public getReviewDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reviewID = req.params.reviewID;
      const reviewData = await this.reviewService.getReviewDetail(reviewID);

      res.status(200).json(reviewData);
    } catch (error) {
      next(error);
    }
  };
}

export default ReviewController;
