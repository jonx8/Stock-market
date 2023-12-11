import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import BrokerInterface from '../brokers/interfaces/broker.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    public constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'username',
            session: false,
        });
    }

    public validate(username: string): BrokerInterface {
        const user: BrokerInterface = this.authService.validateBroker(username);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
