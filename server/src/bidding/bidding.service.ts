import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import BiddingSettingsInterface from './interfaces/bidding-settings.interface';
import BuyStockDto from './dto/buy-stock.dto';
import { BrokersService } from '../brokers/brokers.service';
import { StocksService } from '../stocks/stocks.service';
import StockPriceDto from '../stocks/dto/stock-price.dto';
import SellStockDto from './dto/sell-stock.dto';

@Injectable()
export class BiddingService {
    private interval?: NodeJS.Timeout;
    private settings?: BiddingSettingsInterface;
    private date: Date = new Date();

    public constructor(
        private brokersService: BrokersService,
        private stocksService: StocksService,
    ) {}

    public configure(settings: BiddingSettingsInterface) {
        this.settings = settings;
        this.date = settings.startDate;
    }

    public startBidding(onClock: () => void) {
        if (!this.settings) {
            return;
        }
        // Delay in seconds
        this.interval = setInterval(onClock, this.settings.delay * 1000);
    }

    public stopBidding() {
        clearInterval(this.interval);
    }

    public set currentDate(date: Date) {
        this.date = date;
    }

    public get currentDate(): Date {
        return this.date;
    }

    public async buyActive(dto: BuyStockDto) {
        const broker = this.brokersService.findById(dto.brokerId);
        const stock = this.stocksService.findBySymbol(dto.symbol);

        if (!broker || !stock) {
            throw new NotFoundException('Broker or stock does not exist' + '');
        }

        const price: number = await this.getCurrentPriceBySymbol(dto.symbol);
        const sum: number = price * dto.quantity;

        if (sum > broker.balance || stock.quantity < dto.quantity) {
            throw new BadRequestException('Incorrect quantity');
        }

        broker.balance -= sum;
        stock.quantity -= dto.quantity;
        const index = broker.actives.findIndex(
            (it) => it.symbol === dto.symbol,
        );
        if (index === -1) {
            broker.actives.push({
                symbol: stock.symbol,
                price: sum,
                quantity: dto.quantity,
                company: stock.company,
            });
        } else {
            broker.actives[index].price += sum;
            broker.actives[index].quantity += dto.quantity;
        }
        await this.brokersService.update(broker);
        await this.stocksService.update(stock);
    }

    public async sellActive(dto: SellStockDto) {
        const broker = this.brokersService.findById(dto.brokerId);
        const stock = this.stocksService.findBySymbol(dto.symbol);

        if (!broker || !stock) {
            throw new NotFoundException('Broker or stock does not exist' + '');
        }

        const index = broker.actives.findIndex(
            (it) => it.symbol === dto.symbol,
        );
        if (index === -1) {
            throw new NotFoundException(`Active ${dto.symbol} does not exist`);
        }

        if (broker.actives[index].quantity < dto.quantity) {
            throw new BadRequestException('Incorrect quantity');
        }

        const price: number = await this.getCurrentPriceBySymbol(dto.symbol);
        const sum: number = price * dto.quantity;

        broker.balance += sum;
        stock.quantity += dto.quantity;
        broker.actives[index].price -= sum;
        broker.actives[index].quantity -= dto.quantity;

        await this.brokersService.update(broker);
        await this.stocksService.update(stock);
    }

    private async getCurrentPriceBySymbol(symbol: string) {
        const stocksPrices: StockPriceDto[] =
            await this.stocksService.getPricesByDate(
                new Date(this.currentDate),
            );
        const result: StockPriceDto = stocksPrices.find((stock) => {
            return stock.symbol === symbol;
        });
        return result.price;
    }
}
