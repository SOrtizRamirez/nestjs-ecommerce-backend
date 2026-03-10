import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './services/reviews.service';
import { ReviewsController } from './controllers/reviews.controller';
import { Review } from './entities/review.entity';
import { Product } from '../products/entities/products.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Review,
            Product
        ])
    ],
    controllers: [ReviewsController],
    providers: [ReviewsService]
})
export class ReviewsModule { }