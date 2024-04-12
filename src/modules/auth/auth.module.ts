import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/auth.local.strategy';

@Module({
	imports: [JwtModule.register({ global: true }), { module: TokenModule, global: true }, UserModule],
	controllers: [AuthController],
	providers: [LocalStrategy, JwtService, AuthService],
	exports: [AuthService],
})
export class AuthModule {}
