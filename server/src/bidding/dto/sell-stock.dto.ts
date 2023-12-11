import { IsInt, IsNumber, IsPositive, IsString, Min } from "class-validator";

export default class SellStockDto {
    @IsNumber()
    @IsInt()
    @IsPositive()
    brokerId: number;

    @IsString()
    symbol: string;

    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity: number;
}
