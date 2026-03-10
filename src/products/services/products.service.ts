import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/products.entity';
import { ProductImage } from '../entities/product-image.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Category } from '../../categories/entities/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(ProductImage)
        private readonly imageRepository: Repository<ProductImage>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    async create(createProductDto: CreateProductDto) {
        const { images = [], category_id, ...productData } = createProductDto;
        const category = await this.categoryRepository.findOne({
            where: { id: category_id }
        });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const product = this.productRepository.create({
            ...productData,
            category,
            images: images.map(url => this.imageRepository.create({ url }))
        });
        return await this.productRepository.save(product);
    }

    async findAll(page = 1, limit = 10, category?: string) {
        const query = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.images', 'images')
            .leftJoinAndSelect('product.category', 'category');

        if (category) {
            query.andWhere('category.id = :category', { category });
        }

        query.skip((page - 1) * limit)
            .take(limit);

        const [products, total] = await query.getManyAndCount();

        return {
            total,
            page,
            limit,
            data: products
        };
    }

    async findOne(id: string) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['images', 'category']
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return await this.productRepository.save(product);

    }

    async remove(id: string) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
        return {
            message: 'Product deleted successfully'
        };
    }
};