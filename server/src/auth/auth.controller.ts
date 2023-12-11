import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import BrokerInterface from '../brokers/interfaces/broker.interface';

@Controller('api/v1/auth')
export class AuthController {
    public constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    public login(@Req() req: any): {
        access_token: string;
        broker: BrokerInterface;
    } {
        return this.authService.login(req.user);
    }
}
