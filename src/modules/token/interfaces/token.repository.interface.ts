import { IBaseRepository } from '@/base/interfaces/base.repository.interface';
import mongoose from 'mongoose';
import { TokenDocument } from '../schemas/token.schema';

export interface ITokenRepository extends IBaseRepository<TokenDocument> {
	revokeToken(user: mongoose.Types.ObjectId, token: string): Promise<unknown>;
	findByUser(user): Promise<TokenDocument>;
	checkRevokedToken(user, token): Promise<boolean>;
}
