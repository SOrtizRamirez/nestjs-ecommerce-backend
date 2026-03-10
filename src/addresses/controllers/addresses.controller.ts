import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common';
import { AddressesService } from '../services/addresses.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { UpdateAddressDto } from '../dtos/update-address.dto';
import { User } from '../../users/entities/user.entity';

@Controller('addresses')
@UseGuards(JwtAuthGuard)
export class AddressesController {

    constructor(
        private readonly addressesService: AddressesService
    ) { }

    @Post()
    create(
        @GetUser() user: User,
        @Body() createAddressDto: CreateAddressDto
    ) {
        return this.addressesService.create(user, createAddressDto);
    }

    @Get()
    findUserAddresses(
        @GetUser() user: User
    ) {
        return this.addressesService.findUserAddresses(user);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAddressDto: UpdateAddressDto
    ) {
        return this.addressesService.update(id, updateAddressDto);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string
    ) {
        return this.addressesService.remove(id);
    }
};