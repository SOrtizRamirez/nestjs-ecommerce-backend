import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { User } from '../../users/entities/user.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) { }

    @Post()
    createOrder(
        @GetUser() user: User,
        @Body() createOrderDto: CreateOrderDto
    ) {
        return this.ordersService.createOrder(user, createOrderDto);
    }

    @Get()
    findUserOrders(
        @GetUser() user: User
    ) {
        return this.ordersService.findUserOrders(user);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string
    ) {
        return this.ordersService.findOne(id);
    }
};