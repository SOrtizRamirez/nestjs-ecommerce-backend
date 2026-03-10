import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsService } from './services/shipments.service';
import { ShipmentsController } from './controllers/shipments.controller';
import { Shipment } from './entities/shipments.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Shipment,
            Order
        ])
    ],
    controllers: [ShipmentsController],
    providers: [ShipmentsService]
})
export class ShipmentsModule { }