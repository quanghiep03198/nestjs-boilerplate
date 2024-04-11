import mongoose from 'mongoose';

export interface IToken {
	user: mongoose.Types.ObjectId;
	revoked_tokens: Array<string>;
}
