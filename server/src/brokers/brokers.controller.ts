import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BrokersService } from './brokers.service';
import CreateBrokerDto from './dto/create-broker.dto';
import UpdateBrokerDto from './dto/update-broker.dto';
import BrokerInterface from './interfaces/broker.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/brokers')
export class BrokersController {
    public constructor(private readonly brokersService: BrokersService) {}

    @Get()
    public async findAllBrokers(): Promise<BrokerInterface[]> {
        return await this.brokersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async findBroker(@Param('id', ParseIntPipe) id: number) {
        const broker: BrokerInterface = this.brokersService.findById(id);
        if (broker) {
            return broker;
        }
        throw new HttpException(
            `Broker with id: ${id} does not exist`,
            HttpStatus.NOT_FOUND,
        );
    }

    @UsePipes(new ValidationPipe())
    @Post()
    public async createBroker(@Body() dto: CreateBrokerDto) {
        return await this.brokersService.create(dto);
    }

    @UsePipes(new ValidationPipe())
    @Put(':id')
    public async updateBroker(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateBrokerDto,
    ): Promise<BrokerInterface> {
        const broker: BrokerInterface = this.brokersService.findById(id);
        if (broker) {
            return await this.brokersService.updateInfo(id, dto);
        }
        throw new HttpException(
            `Broker with id: ${id} does not exist`,
            HttpStatus.NOT_FOUND,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteBroker(@Param('id', ParseIntPipe) id: number) {
        const broker = this.brokersService.findById(id);

        if (broker) {
            return await this.brokersService.delete(id);
        }
        throw new HttpException(
            `Broker with id: ${id} does not exist`,
            HttpStatus.NOT_FOUND,
        );
    }
}
