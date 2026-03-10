import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/products.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Category,
            Product
        ])
    ],
    controllers: [SeedController],
    providers: [SeedService]
})
export class SeedModule { }