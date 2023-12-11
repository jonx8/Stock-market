import { Module } from '@nestjs/common';
import { BiddingGateway } from './bidding.gateway';
import { BiddingController } from './bidding.controller';
import { BiddingService } from './bidding.service';
import { BrokersService } from '../brokers/brokers.service';
import { StocksService } from '../stocks/stocks.service';
import { StocksModule } from '../stocks/stocks.module';
import { BrokersModule } from '../brokers/brokers.module';
import { StorageService } from '../storage/storage.service';
import { StorageModule } from '../storage/storage.module';

@Module({
    providers: [
        BiddingGateway,
        BiddingService,
        BrokersService,
        StocksService,
        StorageService,
    ],
    imports: [StocksModule, BrokersModule, StorageModule],
    controllers: [BiddingController],
})
export class BiddingModule {}
