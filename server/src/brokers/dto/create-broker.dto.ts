import { IsString, IsNumber } from 'class-validator';

export default class CreateBrokerDto {
    @IsString()
    username: string;

    @IsNumber()
    balance: number;
}
