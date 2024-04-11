import { Injectable } from '@nestjs/common';
import mongoose, { Document } from 'mongoose';
import { IBaseRepository } from './interfaces/base.repository.interface';
import { IBaseService } from './interfaces/base.service.interface';

@Injectable()
export abstract class BaseAbstractService<TDocument extends Document> implements IBaseService<TDocument> {
	constructor(private readonly repository: IBaseRepository<TDocument>) {}

	async all(): Promise<TDocument[]> {
		return await this.repository.all();
	}
	async findOneById(id: mongoose.Types.ObjectId): Promise<TDocument> {
		return await this.repository.findOneById(id);
	}
	async create(payload): Promise<TDocument> {
		return await this.repository.create(payload);
	}
	async findByIdAndUpdate(id: mongoose.Types.ObjectId, payload): Promise<TDocument> {
		return await this.repository.findByIdAndUpdate(id, payload);
	}
	async findByIdAndDelete(id: mongoose.Types.ObjectId): Promise<TDocument> {
		return await this.repository.findByIdAndDelete(id);
	}
}
