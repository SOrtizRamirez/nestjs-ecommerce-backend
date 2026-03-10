import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment, ShipmentStatus } from '../entities/shipments.entity';
import { Order } from '../../orders/entities/order.entity';
import { CreateShipmentDto } from '../dtos/create-shipment.dto';
import { UpdateShipmentDto } from '../dtos/update-shipment.dto';

@Injectable()
export class ShipmentsService {
    constructor(

        @InjectRepository(Shipment)
        private readonly shipmentRepository: Repository<Shipment>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>

    ) { }

    async create(createShipmentDto: CreateShipmentDto) {
        const { order_id, carrier, tracking_number } = createShipmentDto;
        const order = await this.orderRepository.findOne({
            where: { id: order_id }
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const shipment = this.shipmentRepository.create({
            order,
            carrier,
            tracking_number,
            status: ShipmentStatus.SHIPPED
        });

        return await this.shipmentRepository.save(shipment);

    }

    async findAll() {
        return await this.shipmentRepository.find({
            relations: ['order']
        });
    }

    async findOne(id: string) {
        const shipment = await this.shipmentRepository.findOne({
            where: { id },
            relations: ['order']
        });

        if (!shipment) {
            throw new NotFoundException('Shipment not found');
        }
        return shipment;
    }

    async update(id: string, updateDto: UpdateShipmentDto) {
        const shipment = await this.findOne(id);
        Object.assign(shipment, updateDto);
        return await this.shipmentRepository.save(shipment);
    }
};