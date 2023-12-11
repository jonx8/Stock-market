import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './auth.constants';
import { BrokersModule } from '../brokers/brokers.module';
import { BrokersService } from '../brokers/brokers.service';
import { StorageModule } from '../storage/storage.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    providers: [
        AuthService,
        AuthController,
        BrokersService,
        LocalStrategy,
        JwtStrategy,
    ],
    imports: [
        PassportModule.register({
            session: false,
        }),
        forwardRef(() => BrokersModule),
        StorageModule,
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
})
export class AuthModule {}
