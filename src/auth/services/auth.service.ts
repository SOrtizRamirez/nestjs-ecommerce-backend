import {
    Injectable,
    UnauthorizedException,
    ConflictException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password, ...userData } = registerDto;
        const exists = await this.userRepository.findOne({
            where: { email }
        });

        if (exists) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            ...userData,
            email,
            password: hashedPassword
        });

        await this.userRepository.save(user);
        return {
            message: 'User registered successfully'
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role', 'name']
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        const token = this.jwtService.sign(payload);

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            accessToken: token
        };
    }

    private getJwtToken(payload: object) {
        return this.jwtService.sign(payload);
    }

}