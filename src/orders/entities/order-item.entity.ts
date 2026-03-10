import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Order } from './order.entity';
import { Product } from '../../products/entities/products.entity';

@Entity('order_items')
export class OrderItem extends BaseEntity {

    @Column()
    quantity: number;

    @Column('numeric', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Order, order => order.items)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
};