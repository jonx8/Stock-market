import { forwardRef, Module } from '@nestjs/common';
import { BrokersService } from './brokers.service';
import { BrokersController } from './brokers.controller';
import { StorageService } from '../storage/storage.service';
import { StorageModule } from '../storage/storage.module';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
    providers: [BrokersService, StorageService, JwtAuthGuard],
    imports: [StorageModule, forwardRef(() => AuthModule)],
    exports: [BrokersService],
    controllers: [BrokersController],
})
export class BrokersModule {}
