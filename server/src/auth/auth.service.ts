import { Injectable } from '@nestjs/common';
import { BrokersService } from '../brokers/brokers.service';
import { JwtService } from '@nestjs/jwt';
import BrokerInterface from '../brokers/interfaces/broker.interface';

@Injectable()
export class AuthService {
    public constructor(
        private readonly brokersService: BrokersService,
        private readonly jwtService: JwtService,
    ) {}

    public validateBroker(username: string): BrokerInterface {
        const broker: BrokerInterface =
            this.brokersService.findByUsername(username);
        if (broker) {
            return broker;
        }
        return null;
    }

    public login(broker: BrokerInterface) {
        const payload = {
            username: broker.username,
            sub: broker.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
            broker: broker,
        };
    }
}
