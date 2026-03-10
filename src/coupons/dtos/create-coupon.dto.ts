import {
    IsDateString,
    IsEnum,
    IsNumber,
    IsString
} from 'class-validator';

import { CouponDiscountType } from '../entities/coupons.entity';

export class CreateCouponDto {

    @IsString()
    code: string;

    @IsEnum(CouponDiscountType)
    discount_type: CouponDiscountType;

    @IsNumber()
    discount_value: number;

    @IsDateString()
    expires_at: Date;

}