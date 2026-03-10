import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/products.entity';

@Injectable()
export class SeedService {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>

    ) { }

    async runSeed() {
        await this.deleteTables();
        const admin = await this.createAdminUser();
        const categories = await this.createCategories();
        await this.createProducts(categories);
        return {
            message: 'Database seeded successfully'
        };
    }

    private async deleteTables() {
        await this.productRepository.clear();
        await this.categoryRepository.clear();
        await this.userRepository.clear();
    }

    private async createAdminUser() {
        const password = await bcrypt.hash('admin123', 10);
        const admin = this.userRepository.create({
            name: 'Admin',
            email: 'admin@email.com',
            password,
            role: UserRole.ADMIN
        });
        return await this.userRepository.save(admin);
    }

    private async createCategories() {
        const categories = [
            { name: 'Electronics', slug: 'electronics' },
            { name: 'Clothing', slug: 'clothing' },
            { name: 'Books', slug: 'books' }
        ];
        const createdCategories = this.categoryRepository.create(categories);
        return await this.categoryRepository.save(createdCategories);
    }

    private async createProducts(categories: Category[]) {
        const products = [
            {
                name: 'Laptop',
                description: 'Powerful laptop',
                price: 1500,
                stock: 10,
                sku: 'LAP-001',
                category: categories[0]
            },

            {
                name: 'T-Shirt',
                description: 'Cotton t-shirt',
                price: 25,
                stock: 50,
                sku: 'TSHIRT-001',
                category: categories[1]
            },

            {
                name: 'Programming Book',
                description: 'Learn programming',
                price: 40,
                stock: 30,
                sku: 'BOOK-001',
                category: categories[2]
            }
        ];
        const createdProducts = this.productRepository.create(products);
        return await this.productRepository.save(createdProducts);
    }
}