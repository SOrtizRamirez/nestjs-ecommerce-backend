import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../products/entities/products.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Cart,
            CartItem,
            Product
        ])
    ],
    controllers: [CartController],
    providers: [CartService]
})
export class CartModule { }