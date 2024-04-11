import mongoSchemaConfig from '@/configs/mongoose.schema.config';
import { Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema(mongoSchemaConfig)
export abstract class BaseAbstractSchema {
	/**
	 * @public
	 * @description Default unique id for each documents in collection
	 */
	_id: mongoose.Types.ObjectId;
}
