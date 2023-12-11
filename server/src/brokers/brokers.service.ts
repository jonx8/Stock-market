import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import BrokerInterface from './interfaces/broker.interface';
import CreateBrokerDto from './dto/create-broker.dto';
import { StorageService } from '../storage/storage.service';
import UpdateBrokerDto from './dto/update-broker.dto';

@Injectable()
export class BrokersService implements OnModuleInit {
    private brokers: BrokerInterface[];
    private readonly dataFileName: string = 'brokers.json';

    constructor(private readonly storageService: StorageService) {}

    public async onModuleInit() {
        this.brokers = await this.storageService.load(this.dataFileName);
    }

    public findById(id: number): BrokerInterface | undefined {
        return this.brokers.find((broker) => {
            return broker.id === id;
        });
    }

    public findByUsername(username: string): BrokerInterface | undefined {
        return this.brokers.find((broker) => {
            return broker.username === username;
        });
    }

    public async findAll(): Promise<BrokerInterface[]> {
        this.brokers = await this.storageService.load(this.dataFileName);
        return this.brokers;
    }

    public async create(dto: CreateBrokerDto): Promise<BrokerInterface> {
        this.brokers.push({
            ...dto,
            id: this.generateId(),
            actives: [],
        });
        await this.storageService.save(this.dataFileName, this.brokers);
        return this.brokers[this.brokers.length - 1];
    }

    public async update(broker: BrokerInterface) {
        const index: number = this.brokers.findIndex((el) => {
            return el.id === broker.id;
        });
        if (index === -1) {
            throw new NotFoundException(
                `Broker with id ${broker.id} does not exist`,
            );
        }
        this.brokers[index] = broker;
        await this.storageService.save(this.dataFileName, this.brokers);
        return broker;
    }

    public async updateInfo(
        id: number,
        dto: UpdateBrokerDto,
    ): Promise<BrokerInterface> {
        const index: number = this.brokers.findIndex((broker) => {
            return broker.id === id;
        });
        this.brokers[index].username = dto.username;
        this.brokers[index].balance = dto.balance;
        await this.storageService.save(this.dataFileName, this.brokers);
        return this.brokers[index];
    }

    public async delete(id: number) {
        const index: number = this.brokers.findIndex((broker) => {
            return broker.id === id;
        });
        this.brokers.splice(index, 1);
        await this.storageService.save(this.dataFileName, this.brokers);
    }

    private generateId(): number {
        if (this.brokers.length === 0) return 1;
        return (
            this.brokers.reduce((prev, curr) => {
                return prev.id > curr.id ? prev : curr;
            }).id + 1
        );
    }
}
