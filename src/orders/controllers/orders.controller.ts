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
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

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

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @GetUser() user: User
    ) {
        return this.ordersService.findOne(id, user);
    }

    @Get('admin/all')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    findAllOrders() {
        return this.ordersService.findAll();
    }
};