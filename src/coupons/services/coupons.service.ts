import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from '../entities/coupons.entity';
import { CreateCouponDto } from '../dtos/create-coupon.dto';

@Injectable()
export class CouponsService {
    constructor(

        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>

    ) { }

    async create(dto: CreateCouponDto) {
        const coupon = this.couponRepository.create(dto);
        return await this.couponRepository.save(coupon);
    }

    async findAll() {
        return await this.couponRepository.find();
    }

    async findByCode(code: string) {
        const coupon = await this.couponRepository.findOne({
            where: { code }
        });

        if (!coupon) {
            throw new NotFoundException('Coupon not found');
        }
        return coupon;
    }
}