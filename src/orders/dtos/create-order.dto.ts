import { IsUUID } from 'class-validator';

export class CreateOrderDto {
    @IsUUID()
    address_id: string;
};