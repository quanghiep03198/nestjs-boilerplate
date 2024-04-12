import mongoSchemaConfig from '@/configs/mongoose.schema.config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { BaseAbstractSchema } from '@/base/schema/base.abstract.schema';
import { UserRole } from '@/common/enums/user.enum';

export type UserDocument = HydratedDocument<IUser>;

const COLLECTION_NAME = 'users' as const;

@Schema({ collection: COLLECTION_NAME, ...mongoSchemaConfig })
export class User extends BaseAbstractSchema {
	@Prop({
		type: String,
		required: true,
		trim: true,
		unique: true,
		index: true,
		match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
	})
	email: string;

	@Prop({
		type: String,
		required: true,
		trim: true,
	})
	password: string;

	@Prop({
		type: String,
		required: true,
		trim: true,
	})
	display_name: string;

	@Prop({
		type: String,
		required: true,
		trim: true,
	})
	address: string;

	@Prop({ type: Date, default: null })
	email_verified_at: Date | null;

	@Prop({
		type: Number,
		required: true,
		enum: [UserRole.ADMIN, UserRole.USER],
		default: UserRole.USER,
	})
	role: UserRole;
}

export const userSchema = SchemaFactory.createForClass(User);
