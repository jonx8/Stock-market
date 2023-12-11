import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { StorageService } from '../storage/storage.service';
import { StorageModule } from '../storage/storage.module';

@Module({
    providers: [StocksService, StorageService],
    controllers: [StocksController],
    imports: [StorageModule],
})
export class StocksModule {}
