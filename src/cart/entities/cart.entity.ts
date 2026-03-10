import {
    Entity,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart extends BaseEntity {

    @ManyToOne(() => User, user => user.carts)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => CartItem, item => item.cart, {
        cascade: true
    })
    items: CartItem[];
}