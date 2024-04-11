import mongoose from 'mongoose'

export interface IBaseRepository<TDocument> {
	all(): Promise<TDocument[]>
	findOneById(id: mongoose.Types.ObjectId): Promise<TDocument>
	create(payload): Promise<TDocument>
	findByIdAndUpdate(id: mongoose.Types.ObjectId, payload): Promise<TDocument>
	findByIdAndDelete(id: mongoose.Types.ObjectId): Promise<TDocument>
}
