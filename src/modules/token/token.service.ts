import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
	constructor(
		@Inject(TokenRepository.name)
		private readonly tokenRepository: TokenRepository,
	) {}

	async findOrCreate(user) {
		const existedUserToken = await this.tokenRepository.findByUser(user);
		if (existedUserToken) return existedUserToken;
		return await this.tokenRepository.create({ user });
	}

	async checkRevokedToken(user, token) {
		const isTokenRevoked = await this.tokenRepository.checkRevokedToken(user, token);
		if (isTokenRevoked) throw new UnauthorizedException('Access token has revoked');
		return false;
	}

	async revokeToken(user, token) {
		return await this.tokenRepository.revokeToken(user, token);
	}
}
