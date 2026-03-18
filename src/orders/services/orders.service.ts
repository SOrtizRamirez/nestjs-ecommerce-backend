import {
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { CartItem } from '../../cart/entities/cart-item.entity';
import { Address } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,

        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,

        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,

        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ) { }

    async createOrder(user: User, createOrderDto: CreateOrderDto) {
        const { address_id } = createOrderDto;
        const address = await this.addressRepository.findOne({
            where: { id: address_id }
        });

        if (!address) {
            throw new NotFoundException('Address not found');
        }

        const cart = await this.cartRepository.findOne({
            where: { user: { id: user.id } },
            relations: ['items', 'items.product']
        });

        if (!cart || !cart.items.length) {
            throw new NotFoundException('Cart is empty');
        }

        let total = 0;

        const order = this.orderRepository.create({
            user,
            address,
            total_price: 0
        });

        const savedOrder = await this.orderRepository.save(order);

        for (const item of cart.items) {
            const subtotal = item.product.price * item.quantity;
            total += subtotal;
            const orderItem = this.orderItemRepository.create({

                order: savedOrder,
                product: item.product,
                quantity: item.quantity,
                price: item.product.price

            });
            await this.orderItemRepository.save(orderItem);
        }
        savedOrder.total_price = total;
        await this.orderRepository.save(savedOrder);
        await this.cartItemRepository.delete({
            cart: { id: cart.id }
        });
        return savedOrder;
    }

    async findUserOrders(user: User) {
        return await this.orderRepository.find({
            where: { user: { id: user.id } },
            relations: ['items', 'items.product', 'address']
        });
    }

    async findOne(id: string, user: User) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'items'],
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        if (order.user.id !== user.id && user.role !== 'admin') {
            throw new ForbiddenException('Access denied');
        }

        return order;
    }

    async findAll(page = 1, limit = 10) {
        const [data, total] = await this.orderRepository.findAndCount({
            relations: ["user", "items", "items.product"],
            order: { createdAt: "DESC" },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };
    }

};