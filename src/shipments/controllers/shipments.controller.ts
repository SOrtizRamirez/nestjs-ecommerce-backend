import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    UseGuards
} from '@nestjs/common';
import { ShipmentsService } from '../services/shipments.service';
import { CreateShipmentDto } from '../dtos/create-shipment.dto';
import { UpdateShipmentDto } from '../dtos/update-shipment.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('shipments')
@UseGuards(JwtAuthGuard)
export class ShipmentsController {

    constructor(
        private readonly shipmentsService: ShipmentsService
    ) { }

    @Post()
    create(
        @Body() createShipmentDto: CreateShipmentDto
    ) {
        return this.shipmentsService.create(createShipmentDto);
    }

    @Get()
    findAll() {
        return this.shipmentsService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id') id: string
    ) {
        return this.shipmentsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateShipmentDto: UpdateShipmentDto
    ) {
        return this.shipmentsService.update(id, updateShipmentDto);
    }

}