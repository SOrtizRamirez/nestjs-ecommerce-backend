import {
    Entity,
    Column,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Order } from '../../orders/entities/order.entity';

export enum ShipmentStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    IN_TRANSIT = 'in_transit',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}

@Entity('shipments')
export class Shipment extends BaseEntity {

    @Column()
    carrier: string;

    @Column()
    tracking_number: string;

    @Column({
        type: 'enum',
        enum: ShipmentStatus,
        default: ShipmentStatus.PENDING
    })
    status: ShipmentStatus;

    @Column({ type: 'timestamp', nullable: true })
    shipped_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    delivered_at: Date;

    @OneToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;
};