import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersModule } from './brokers/brokers.module';
import { StorageModule } from './storage/storage.module';
import { StocksModule } from './stocks/stocks.module';
import { AuthModule } from './auth/auth.module';
import { BiddingModule } from './bidding/bidding.module';

@Module({
    imports: [
        BrokersModule,
        StorageModule,
        StocksModule,
        AuthModule,
        BiddingModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
