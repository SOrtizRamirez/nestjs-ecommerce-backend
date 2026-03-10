import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { UpdateAddressDto } from '../dtos/update-address.dto';

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ) { }

    async create(user: User, createAddressDto: CreateAddressDto) {
        const address = this.addressRepository.create({
            ...createAddressDto,
            user
        });
        return await this.addressRepository.save(address);
    }

    async findUserAddresses(user: User) {
        return await this.addressRepository.find({
            where: { user: { id: user.id } }
        });
    }

    async findOne(id: string) {
        const address = await this.addressRepository.findOne({
            where: { id }
        });
        if (!address) {
            throw new NotFoundException('Address not found');
        }
        return address;
    }

    async update(id: string, updateAddressDto: UpdateAddressDto) {
        const address = await this.findOne(id);
        Object.assign(address, updateAddressDto);
        return await this.addressRepository.save(address);
    }

    async remove(id: string) {
        const address = await this.findOne(id);
        await this.addressRepository.remove(address);
        return {
            message: 'Address deleted'
        };
    }
};