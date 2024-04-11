import { BaseAbstractService } from '@/base/base.abstract.service'
import { Inject, Injectable } from '@nestjs/common'
import { PostDocument } from './schemas/post.schema'
import { IPostService } from './interfaces/post.service.interface'
import { PostRepository } from './post.repository'
import { Types, PaginateResult, PaginateDocument, PaginateOptions } from 'mongoose'

@Injectable()
export class PostService extends BaseAbstractService<PostDocument> implements IPostService {
	constructor(@Inject(PostRepository.name) private readonly postRepository: PostRepository) {
		super(postRepository)
	}
	async findUnpublishedPosts({
		page,
		limit
	}: {
		page: number
		limit: number
	}): Promise<PaginateResult<PostDocument>> {
		return await this.postRepository.findUnpublishedPosts({ page, limit })
	}
	async findAllPostOfUser(
		userId: Types.ObjectId,
		paginateOptions: PaginateOptions
	): Promise<PaginateResult<PostDocument>> {
		return await this.postRepository.findAllPostOfUser(userId, paginateOptions)
	}
	async approvePost(postId: Types.ObjectId): Promise<PostDocument> {
		return await this.postRepository.approvePost(postId)
	}
	async publishPost(postId: Types.ObjectId): Promise<PostDocument> {
		return await this.postRepository.publishPost(postId)
	}
	async findOneBySlug(slug: string): Promise<PostDocument> {
		return await this.postRepository.findOneBySlug(slug)
	}

	async findWithPagination({
		page,
		limit
	}): Promise<PaginateResult<PaginateDocument<PostDocument, unknown, unknown>>> {
		return await this.postRepository.findWithPagination({ page, limit })
	}
}
