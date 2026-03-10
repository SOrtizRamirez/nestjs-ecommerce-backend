import { IsOptional, IsString } from 'class-validator';

export class UpdateShipmentDto {

    @IsOptional()
    @IsString()
    status?: string;
};