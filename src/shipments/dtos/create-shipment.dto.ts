import { IsString, IsUUID } from 'class-validator';

export class CreateShipmentDto {
    @IsUUID()
    order_id: string;

    @IsString()
    carrier: string;

    @IsString()
    tracking_number: string;
};