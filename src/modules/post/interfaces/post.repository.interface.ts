import { IBaseRepository } from '@/base/interfaces/base.repository.interface'
import mongoose, { PaginateOptions, PaginateResult } from 'mongoose'
import { PostDocument } from '../schemas/post.schema'

export interface IPostRepository extends IBaseRepository<PostDocument> {
	findWithPagination({
		page,
		limit
	}: {
		page: number
		limit: number
	}): Promise<PaginateResult<PostDocument>>
	approvePost(postId: mongoose.Types.ObjectId): Promise<PostDocument>
	publishPost(postId: mongoose.Types.ObjectId): Promise<PostDocument>
	findOneBySlug(slug: string): Promise<PostDocument>
	findUnpublishedPosts({
		page,
		limit
	}: {
		page: number
		limit: number
	}): Promise<PaginateResult<PostDocument>>
	findAllPostOfUser(
		userId: mongoose.Types.ObjectId,
		paginateOptions: PaginateOptions
	): Promise<PaginateResult<PostDocument>>
}
