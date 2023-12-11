import {
    IsInt,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';

export default class UpdateBrokerDto {
    @IsPositive()
    @IsInt()
    @IsOptional()
    id?: number;

    @IsString()
    username: string;

    @IsNumber()
    balance: number;
}
