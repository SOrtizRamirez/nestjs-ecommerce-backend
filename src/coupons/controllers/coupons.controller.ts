import {
    Controller,
    Post,
    Body,
    Get,
    Param
} from '@nestjs/common';
import { CouponsService } from '../services/coupons.service';
import { CreateCouponDto } from '../dtos/create-coupon.dto';

@Controller('coupons')
export class CouponsController {

    constructor(
        private readonly couponsService: CouponsService
    ) { }

    @Post()
    create(
        @Body() dto: CreateCouponDto
    ) {
        return this.couponsService.create(dto);
    }

    @Get()
    findAll() {
        return this.couponsService.findAll();
    }

    @Get(':code')
    findByCode(
        @Param('code') code: string
    ) {
        return this.couponsService.findByCode(code);
    }
}