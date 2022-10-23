import { Router } from 'express';
import ReviewController from '@/controllers/review.controller';
import { Routes } from '@/interfaces/routes.interface';

export default class ReviewRoute implements Routes {
  public path: string;
  public router: Router;
  public reviewController: ReviewController;

  constructor() {
    this.path = '/review';
    this.router = Router();
    this.reviewController = new ReviewController();

    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.get(`${this.path}/:reviewID`, this.reviewController.getReviewDetail);
  }
}
