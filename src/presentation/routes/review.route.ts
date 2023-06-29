// src/infrastructure/routes/review-routes.ts
import { Router } from 'express';
import { ReviewsController  } from '../controllers/review.controller';
import { isAuthenticatedMiddleware } from '../../shared/middlewares/is-authenticated.middleware';

const reviewController = new ReviewsController();

const reviewRouter = Router();

reviewRouter.get('', reviewController.getAll);
reviewRouter.get('/:id', reviewController.getReviewById);
reviewRouter.post('',isAuthenticatedMiddleware, reviewController.createReview);
reviewRouter.put('/:id',isAuthenticatedMiddleware, reviewController.updateReview);
reviewRouter.delete('/:id',isAuthenticatedMiddleware, reviewController.deleteReview);

export default reviewRouter;
