import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Min
} from 'class-validator';

export class CreateProductDto {

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsString()
    sku: string;

    @IsUUID()
    category_id: string;

    @IsOptional()
    @IsArray()
    images?: string[];
};