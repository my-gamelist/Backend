import prisma from '@/databases/postgreClient';

export default class ReviewService {
  public async getReviewDetail(reviewID) {
    const review = await prisma.review.findUnique({
      where: {
        reviewId: Number(reviewID),
      },
    });

    return review;
  }
}
