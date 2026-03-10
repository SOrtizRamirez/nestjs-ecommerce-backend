import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from './products.entity';

@Entity('product_images')
export class ProductImage extends BaseEntity {

    @Column()
    url: string;

    @Column({ default: false })
    is_main: boolean;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({ name: 'product_id' })
    product: Product;
};