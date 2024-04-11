import { BaseAbstractRepository } from '@/base/base.abstract.repository'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { ITokenRepository } from './interfaces/token.repository.interface'
import { Token, TokenDocument } from './schemas/token.schema'

@Injectable()
export class TokenRepository
	extends BaseAbstractRepository<TokenDocument>
	implements ITokenRepository
{
	constructor(@InjectModel(Token.name) protected tokenModel: Model<TokenDocument>) {
		super(tokenModel)
	}
	async checkRevokedToken(user: mongoose.Types.ObjectId, token: string): Promise<boolean> {
		const result = await this.tokenModel.exists({ user: user, revoked_tokens: { $in: [token] } })
		return Boolean(result)
	}
	async findByUser(user: mongoose.Types.ObjectId): Promise<TokenDocument> {
		return await this.tokenModel.findOne({ user }).lean()
	}
	async revokeToken(user: mongoose.Types.ObjectId, accessToken: string): Promise<unknown> {
		return await this.tokenModel.findOneAndUpdate(
			{ user: user },
			{ $push: { revoked_tokens: accessToken } },
			{ new: true }
		)
	}
}
