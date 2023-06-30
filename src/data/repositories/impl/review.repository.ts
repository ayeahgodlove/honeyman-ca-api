import { Review } from "../../entities/review";
import { IReviewRepository } from "../contracts/ireview.repository";
import { IReview } from "../../../domain/models/review";

export class ReviewRepository implements IReviewRepository {
    /**
     *
     */
    constructor() {}

    /**
     * Receives a Review as parameter
     * @review
     * returns void
     */
    async create(review: IReview): Promise<Review> {
     try {
       return await Review.create<Review>(review as any);
     } catch (error) {
       throw error;
     }
    }

    /**
     * Receives a String as parameter
     * @id
     * returns Review
     */
    async findById(id: string): Promise<Review | null>{
      try {
        const reviewItem = await Review.findByPk(id);
        return reviewItem;
      } catch (error) {
        throw error;
      }
    }

    /*
     * Returns an array of Review
     */
    async getAll(): Promise<Review[]> {
      try {
        const categories = await Review.findAll();
        return categories;
      } catch (error) {
        throw error;
      }
    };

    /**
     * Receives a Review as parameter
     * @review
     * returns void
     */
    async update(review: IReview): Promise<Review> {
      const {id, rating, userId, productId, description} = review;
      try {
        const reviewItem: any = await Review.findByPk(id);
        return await reviewItem?.update({
          id,
          rating,
          userId,
          productId,
          description,
        });
      } catch (error) {
        throw error;
      }
    }

    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id: string): Promise<void> {
      try {
        const reviewItem = await Review.findByPk(id);
        await reviewItem?.destroy({
          force: true,
        });
      } catch (error) {
        throw error;
      }
    }
  }