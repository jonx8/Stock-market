import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import StockInterface from './interfaces/stock.interface';

@Controller('api/v1/stocks')
export class StocksController {
    public constructor(private readonly stocksService: StocksService) {}

    @Get()
    public async findAllStocks() {
        return this.stocksService.findAll();
    }

    @Get(':symbol')
    public async findHistoryData(@Param('symbol') symbol: string) {
        const stock: StockInterface = this.stocksService.findBySymbol(symbol);
        if (!stock) {
            throw new HttpException(
                `Stock ${symbol} does not exist`,
                HttpStatus.NOT_FOUND,
            );
        }
        return await this.stocksService.getFullHistory(stock);
    }
}
