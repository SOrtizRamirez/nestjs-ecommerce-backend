import {
    IsArray,
    ValidateNested,
    IsNumber,
    IsString,
    Min,
} from "class-validator";
import { Type } from "class-transformer";

class OrderItemDto {
    @IsString()
    productId: string;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsNumber()
    @Min(0)
    total: number;

    @IsString()
    address_id: string;
}