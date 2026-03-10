import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/products.entity';

@Entity('reviews')
export class Review extends BaseEntity {

    @Column()
    rating: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Product, product => product.reviews)
    @JoinColumn({ name: 'product_id' })
    product: Product;
};