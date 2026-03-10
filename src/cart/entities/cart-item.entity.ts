import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Cart } from './cart.entity';
import { Product } from '../../products/entities/products.entity';

@Entity('cart_items')
export class CartItem extends BaseEntity {

    @Column()
    quantity: number;

    @ManyToOne(() => Cart, cart => cart.items)
    @JoinColumn({ name: 'cart_id' })
    cart: Cart;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
};