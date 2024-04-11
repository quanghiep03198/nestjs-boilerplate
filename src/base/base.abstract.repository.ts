import { Injectable } from '@nestjs/common'
import { IBaseRepository } from './interfaces/base.repository.interface'
import { BaseAbstractSchema } from './schema/base.abstract.schema'
import { Model, Types } from 'mongoose'

@Injectable()
export abstract class BaseAbstractRepository<TDocument extends BaseAbstractSchema>
	implements IBaseRepository<TDocument>
{
	protected constructor(private readonly model: Model<TDocument>) {}

	async all(): Promise<TDocument[]> {
		return await this.model.find()
	}

	async findOneById(id: Types.ObjectId): Promise<TDocument> {
		return await this.model.findById(id)
	}

	async create(payload: any): Promise<TDocument> {
		return await new this.model(payload).save()
	}

	async findByIdAndUpdate(id: Types.ObjectId, payload: any): Promise<TDocument> {
		return await this.model.findByIdAndUpdate(id, payload, { new: true })
	}

	async findByIdAndDelete(id: Types.ObjectId): Promise<TDocument> {
		return await this.model.findByIdAndDelete(id)
	}
}
