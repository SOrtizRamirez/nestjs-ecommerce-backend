import {
    Controller,
    Get,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UpdateUserDto } from '../dtos/update-users.dto';
import { User } from '../entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get('profile')
    getProfile(
        @GetUser() user: User
    ) {
        return user;
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin')
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id') id: string
    ) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles('admin')
    remove(
        @Param('id') id: string
    ) {
        return this.usersService.remove(id);
    }
}