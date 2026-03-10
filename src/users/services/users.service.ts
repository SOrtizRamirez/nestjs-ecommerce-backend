import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-users.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll() {
        return await this.userRepository.find();
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;

    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return {
            message: 'User deleted'
        };
    }
};