import { BaseAbstractRepository } from '@/base/base.abstract.repository';
import { Injectable, Post } from '@nestjs/common';
import { IPostRepository } from './interfaces/post.repository.interface';
import { PostDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Document, PaginateDocument, PaginateModel, PaginateOptions, PaginateResult, Types } from 'mongoose';
import { IPost } from './interfaces/post.interface';

@Injectable()
export class PostRepository extends BaseAbstractRepository<PostDocument> implements IPostRepository {
	constructor(@InjectModel(Post.name) protected postModel: PaginateModel<PostDocument>) {
		super(postModel);
	}
	async approvePost(postId: Types.ObjectId): Promise<PostDocument> {
		return await this.postModel.findOneAndUpdate({ _id: postId }, { is_approved: true }, { new: true });
	}
	async publishPost(postId: Types.ObjectId): Promise<PostDocument> {
		return await this.postModel.findOneAndUpdate({ _id: postId }, { is_published: true }, { new: true });
	}
	async findOneBySlug(slug: string): Promise<PostDocument> {
		return await this.postModel.findOne({ slug });
	}

	async findWithPagination({
		page,
		limit,
	}: {
		page: number;
		limit: number;
	}): Promise<PaginateResult<PaginateDocument<PostDocument, unknown, unknown>>> {
		return await this.postModel.paginate({}, { page, limit });
	}

	async findUnpublishedPosts({ page, limit }: { page: number; limit: number }): Promise<PaginateResult<PostDocument>> {
		return await this.postModel.paginate({ is_published: false }, { page, limit });
	}

	async findAllPostOfUser(
		userId: mongoose.Types.ObjectId,
		paginateOptions: PaginateOptions,
	): Promise<PaginateResult<PostDocument>> {
		return await this.postModel.paginate({ author: userId }, paginateOptions);
	}
}
