import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../entities/payment.entity';
import { Order } from '../../orders/entities/order.entity';
import { CreatePaymentDto } from '../dtos/create-payment.dto';

@Injectable()
export class PaymentsService {
    constructor(

        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>

    ) { }

    async create(createPaymentDto: CreatePaymentDto) {
        const { order_id, provider, transaction_id } = createPaymentDto;
        const order = await this.orderRepository.findOne({
            where: { id: order_id }
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const payment = this.paymentRepository.create({
            order,
            provider,
            transaction_id,
            amount: order.total_price,
            status: PaymentStatus.COMPLETED
        });
        return await this.paymentRepository.save(payment);
    }

    async findAll() {
        return await this.paymentRepository.find({
            relations: ['order']
        });
    }

    async findOne(id: string) {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['order']
        });

        if (!payment) {
            throw new NotFoundException('Payment not found');
        }
        return payment;
    }
};