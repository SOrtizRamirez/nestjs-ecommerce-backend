import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { User } from '../../users/entities/user.entity';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) { }

    @Get()
    getCart(
        @GetUser() user: User
    ) {
        return this.cartService.getUserCart(user);
    }

    @Post()
    addToCart(
        @GetUser() user: User,
        @Body() addToCartDto: AddToCartDto
    ) {
        return this.cartService.addToCart(user, addToCartDto);
    }

    @Patch(':itemId')
    updateItem(
        @Param('itemId') itemId: string,
        @Body() updateDto: UpdateCartItemDto
    ) {
        return this.cartService.updateItem(itemId, updateDto);
    }

    @Delete(':itemId')
    removeItem(
        @Param('itemId') itemId: string
    ) {
        return this.cartService.removeItem(itemId);
    }

    @Delete()
    clearCart(
        @GetUser() user: User
    ) {
        return this.cartService.clearCart(user);
    }
};