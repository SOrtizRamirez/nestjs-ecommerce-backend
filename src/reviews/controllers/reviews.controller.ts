import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    UseGuards
} from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../../users/entities/user.entity';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService: ReviewsService
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(
        @GetUser() user: User,
        @Body() dto: CreateReviewDto
    ) {
        return this.reviewsService.create(user, dto);
    }

    @Get('product/:productId')
    findProductReviews(
        @Param('productId') productId: string
    ) {
        return this.reviewsService.findProductReviews(productId);
    }
};