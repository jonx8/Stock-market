import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { BiddingService } from './bidding.service';
import BuyStockDto from './dto/buy-stock.dto';
import { StocksService } from '../stocks/stocks.service';
import { BrokersService } from '../brokers/brokers.service';
import BrokerInterface from '../brokers/interfaces/broker.interface';
import StockInterface from '../stocks/interfaces/stock.interface';
import SellStockDto from './dto/sell-stock.dto';

@WebSocketGateway({
    namespace: 'bidding',
    cors: { origin: '*' },
})
export class BiddingGateway {
    @WebSocketServer()
    private readonly server: Server;

    public constructor(
        private readonly biddingService: BiddingService,
        private readonly stocksService: StocksService,
        private readonly brokersService: BrokersService,
    ) {}

    public afterInit(): any {
        this.server.on('connection', (data: Socket) => {
            Logger.debug(`Successful connection ${data.id}`);
        });
    }

    @SubscribeMessage('buyStock')
    @UsePipes(new ValidationPipe())
    public async buyStock(@MessageBody() dto: BuyStockDto) {
        await this.biddingService.buyActive(dto);
        await this.updatePrices();
        await this.updateStocks();
        await this.updateBrokers();
    }

    @SubscribeMessage('sellStock')
    @UsePipes(new ValidationPipe())
    public async sellStock(@MessageBody() dto: SellStockDto) {
        await this.biddingService.sellActive(dto);
        await this.updatePrices();
        await this.updateStocks();
        await this.updateBrokers();
    }

    public async updateStocks() {
        const stocks: StockInterface[] = await this.stocksService.findAll();
        this.server.emit('updateStocks', stocks);
    }

    public async updatePrices() {
        const date: Date = this.biddingService.currentDate;
        const data = {
            date: date,
            stocksList: await this.stocksService.getPricesByDate(date),
        };
        this.server.emit('updateStocks', await this.stocksService.findAll());
        this.server.emit('updatePrices', data);
    }

    private async updateBrokers() {
        const brokers: BrokerInterface[] = await this.brokersService.findAll();
        this.server.emit('updateBrokers', brokers);
    }
}
