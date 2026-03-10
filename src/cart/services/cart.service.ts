import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../../products/entities/products.entity';
import { User } from '../../users/entities/user.entity';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,

        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async getUserCart(user: User) {
        let cart = await this.cartRepository.findOne({
            where: { user: { id: user.id } },
            relations: ['items', 'items.product']
        });

        if (!cart) {
            cart = this.cartRepository.create({
                user
            });
            cart = await this.cartRepository.save(cart);
        }
        return cart;
    }

    async addToCart(user: User, addToCartDto: AddToCartDto) {
        const { product_id, quantity } = addToCartDto;
        const product = await this.productRepository.findOne({
            where: { id: product_id }
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const cart = await this.getUserCart(user);

        const existingItem = cart.items?.find(
            item => item.product.id === product_id
        );

        if (existingItem) {
            existingItem.quantity += quantity;
            return await this.cartItemRepository.save(existingItem);
        }

        const cartItem = this.cartItemRepository.create({
            cart,
            product,
            quantity
        });
        return await this.cartItemRepository.save(cartItem);
    }

    async updateItem(itemId: string, updateDto: UpdateCartItemDto) {
        const item = await this.cartItemRepository.findOne({
            where: { id: itemId }
        });

        if (!item) {
            throw new NotFoundException('Cart item not found');
        }
        item.quantity = updateDto.quantity;
        return await this.cartItemRepository.save(item);
    }

    async removeItem(itemId: string) {
        const item = await this.cartItemRepository.findOne({
            where: { id: itemId }
        });

        if (!item) {
            throw new NotFoundException('Cart item not found');
        };

        await this.cartItemRepository.remove(item);
        return {
            message: 'Item removed from cart'
        };
    }

    async clearCart(user: User) {
        const cart = await this.getUserCart(user);
        await this.cartItemRepository.delete({
            cart: { id: cart.id }
        });
        return {
            message: 'Cart cleared'
        };
    }
};