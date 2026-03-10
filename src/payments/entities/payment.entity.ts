import {
    Entity,
    Column,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Order } from '../../orders/entities/order.entity';

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed'
}

@Entity('payments')
export class Payment extends BaseEntity {

    @Column()
    provider: string;

    @Column()
    transaction_id: string;

    @Column('numeric', { precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING
    })
    status: PaymentStatus;

    @OneToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;
};