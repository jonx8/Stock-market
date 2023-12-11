import { IsDate, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export default class BiddingSettingsDto {
    @Transform(({ value }) => new Date(value))
    @IsDate()
    startDate: Date;

    @IsNumber()
    @IsPositive()
    delay: number;
}
