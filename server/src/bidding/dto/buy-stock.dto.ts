import { IsInt, IsNumber, IsPositive, IsString, Min } from "class-validator";

export default class BuyStockDto {
    @IsNumber()
    @IsPositive()
    @IsInt()
    brokerId: number;

    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity: number;

    @IsString()
    symbol: string;
}
