import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, tokenSchema } from './schemas/token.schema';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Token.name,
				schema: tokenSchema,
			},
		]),
	],
	providers: [TokenService, { provide: TokenRepository.name, useClass: TokenRepository }],
	exports: [TokenService],
})
export class TokenModule {}
