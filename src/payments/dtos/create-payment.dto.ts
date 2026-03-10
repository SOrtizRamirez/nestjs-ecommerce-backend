import { IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {

    @IsUUID()
    order_id: string;

    @IsString()
    provider: string;

    @IsString()
    transaction_id: string;
};