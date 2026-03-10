import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Category } from '../../categories/entities/category.entity';
import { ProductImage } from './product-image.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity('products')
export class Product extends BaseEntity {

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column('numeric', { precision: 10, scale: 2 })
    price: number;

    @Column({ default: 0 })
    stock: number;

    @Index()
    @Column({ unique: true })
    sku: string;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => ProductImage, image => image.product, {
        cascade: true
    })
    images: ProductImage[];

    @OneToMany(() => Review, review => review.product)
    reviews: Review[];
};