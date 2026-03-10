import {
    Entity,
    Column
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

export enum CouponDiscountType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed'
}

@Entity('coupons')
export class Coupon extends BaseEntity {

    @Column({ unique: true })
    code: string;

    @Column({
        type: 'enum',
        enum: CouponDiscountType
    })
    discount_type: CouponDiscountType;

    @Column('numeric', { precision: 10, scale: 2 })
    discount_value: number;

    @Column({ type: 'timestamp' })
    expires_at: Date;

    @Column({ default: true })
    is_active: boolean;

}