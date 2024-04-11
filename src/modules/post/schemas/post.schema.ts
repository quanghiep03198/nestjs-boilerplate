import mongoSchemaConfig from '@/configs/mongoose.schema.config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IPost } from '../interfaces/post.interface';
import { BaseAbstractSchema } from '@/base/schema/base.abstract.schema';
import { User } from '@/modules/user/schemas/user.schema';

export type PostDocument = HydratedDocument<IPost>;

const COLLECTION_NAME = 'posts' as const;

@Schema({ collection: COLLECTION_NAME, ...mongoSchemaConfig })
export class Post extends BaseAbstractSchema {
	@Prop({ type: String, slug: 'title', unique: true, index: true })
	slug: string;

	@Prop({ type: String, required: true, trim: true })
	title: string;

	@Prop({ type: String, required: true, trim: true })
	description: string;

	@Prop({ type: String, required: true, trim: true })
	content: string;

	@Prop({ type: Boolean, default: false })
	is_approved: boolean;

	@Prop({
		type: Boolean,
		default: false,
	})
	is_published: boolean;

	@Prop({
		type: mongoose.Types.ObjectId,
		required: true,
		ref: User.name,
		transform: (value) => new mongoose.Types.ObjectId(value),
	})
	author: mongoose.Types.ObjectId;
}

export const postSchema = SchemaFactory.createForClass(Post);
