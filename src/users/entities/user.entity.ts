import {
    Entity,
    Column,
    OneToMany,
    Index
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { Address } from '../../addresses/entities/address.entity';
import { Order } from '../../orders/entities/order.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Cart } from '../../cart/entities/cart.entity';

export enum UserRole {
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}

@Entity('users')
export class User extends BaseEntity {

    @Column({ length: 120 })
    name: string;

    @Index()
    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.CUSTOMER
    })
    role: UserRole;

    @Column({ nullable: true })
    phone: string;

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    @OneToMany(() => Order, order => order.user)
    orders: Order[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @OneToMany(() => Cart, cart => cart.user)
    carts: Cart[];
};