import { Injectable, OnModuleInit } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import StockInterface from './interfaces/stock.interface';
import StockPriceDto from './dto/stock-price.dto';
import StockHistoryDto from './dto/stock-history.dto';

@Injectable()
export class StocksService implements OnModuleInit {
    private stocks: StockInterface[];
    private readonly stocksFile: string = 'stocks.json';

    public constructor(private readonly storageService: StorageService) {}

    public async onModuleInit() {
        this.stocks = await this.storageService.load(this.stocksFile);
    }

    public findBySymbol(symbol: string): StockInterface | undefined {
        return this.stocks.find((stock) => {
            return stock.symbol === symbol;
        });
    }

    public async findAll(): Promise<StockInterface[]> {
        this.stocks = await this.storageService.load(this.stocksFile);
        return this.stocks;
    }

    public async getFullHistory(stock: StockInterface) {
        return await this.storageService.loadHistoryFile(stock.historyFile);
    }

    public async getPricesByDate(date: Date): Promise<StockPriceDto[]> {
        const listStocks: StockPriceDto[] = [];
        for (const stock of this.stocks) {
            const data: StockHistoryDto =
                await this.storageService.loadHistoryFile(stock.historyFile);
            const index: number = data.dates.findIndex((el) => {
                return Date.parse(el) <= date.getTime();
            });

            listStocks.push({
                price: data.prices[index],
                symbol: stock.symbol,
                quantity: stock.quantity,
            });
        }
        return listStocks;
    }

    public async update(stock: StockInterface) {
        const index = this.stocks.findIndex((it) => {
            return it.symbol === stock.symbol;
        });
        this.stocks[index] = stock;
        await this.storageService.save(this.stocksFile, this.stocks);
        return this.stocks[index];
    }
}
