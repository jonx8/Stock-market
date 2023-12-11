import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import BiddingSettingsDto from './dto/bidding-settings.dto';
import { BiddingService } from './bidding.service';
import { BiddingGateway } from './bidding.gateway';

@Controller('api/v1/bidding')
export class BiddingController {
    public constructor(
        private biddingService: BiddingService,
        private biddingGateway: BiddingGateway,
    ) {}

    @Post('start')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UsePipes(new ValidationPipe())
    public async startBidding(@Body() settingsDto: BiddingSettingsDto) {
        this.biddingService.configure(settingsDto);

        this.biddingService.startBidding(() => {
            const date: Date = new Date(this.biddingService.currentDate);
            date.setDate(date.getDate() + 1);
            this.biddingService.currentDate = date;
            this.biddingGateway.updatePrices();
        });
    }

    @Get('stop')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async stopBidding() {
        this.biddingService.stopBidding();
    }
}
