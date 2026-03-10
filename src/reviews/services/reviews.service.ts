import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Product } from '../../products/entities/products.entity';
import { User } from '../../users/entities/user.entity';
import { CreateReviewDto } from '../dtos/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(

        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>

    ) { }

    async create(user: User, dto: CreateReviewDto) {
        const product = await this.productRepository.findOne({
            where: { id: dto.product_id }
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const review = this.reviewRepository.create({
            rating: dto.rating,
            comment: dto.comment,
            user,
            product
        });
        return await this.reviewRepository.save(review);
    }

    async findProductReviews(productId: string) {
        return await this.reviewRepository.find({
            where: { product: { id: productId } },
            relations: ['user']
        });
    }
};