import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    UseGuards
} from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {

    constructor(
        private readonly paymentsService: PaymentsService
    ) { }

    @Post()
    create(
        @Body() createPaymentDto: CreatePaymentDto
    ) {
        return this.paymentsService.create(createPaymentDto);
    }

    @Get()
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id') id: string
    ) {
        return this.paymentsService.findOne(id);
    }
};