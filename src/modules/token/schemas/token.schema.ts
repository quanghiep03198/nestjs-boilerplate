import { BaseAbstractSchema } from '@/base/schema/base.abstract.schema'
import mongoSchemaConfig from '@/configs/mongoose.schema.config'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { IToken } from '../interfaces/token.interface'

export type TokenDocument = HydratedDocument<IToken>

const COLLECTION_NAME = 'tokens' as const

@Schema({ collection: COLLECTION_NAME, ...mongoSchemaConfig })
export class Token extends BaseAbstractSchema {
	@Prop({ type: mongoose.Types.ObjectId, required: true })
	user: mongoose.Types.ObjectId

	@Prop({
		type: Array,
		default: []
	})
	revoked_tokens: Array<string>
}

export const tokenSchema = SchemaFactory.createForClass(Token)
