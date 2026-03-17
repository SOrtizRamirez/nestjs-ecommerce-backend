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
import { ILike, Between } from "typeorm"

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

    async findAll(
        page: number,
        limit: number,
        category?: string,
        search?: string,
        minPrice?: number,
        maxPrice?: number,
        sort?: string
    ) {

        const where: any = {}

        if (category) {
            where.categoryId = category
        }

        if (search) {
            where.name = ILike(`%${search}%`)
        }

        if (minPrice !== undefined && maxPrice !== undefined) {
            where.price = Between(minPrice, maxPrice)
        }

        let order: any = {}

        if (sort === "price_asc") {
            order.price = "ASC"
        }

        if (sort === "price_desc") {
            order.price = "DESC"
        }

        const [data, total] = await this.productRepository.findAndCount({
            where,
            take: limit,
            skip: (page - 1) * limit,
            order
        })

        return {
            data,
            total
        }
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