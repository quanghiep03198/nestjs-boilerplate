import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ResponseMessage } from '@/common/decorators/response-message.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/enums/user.enum';
import { AllExceptionsFilter } from '@/common/filters/exceptions.filter';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseFilters,
	UseGuards,
	UseInterceptors,
	UsePipes,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { IUser } from '../user/interfaces/user.interface';
import { CreatePostDTO, createPostValidator } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get('published')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Ok')
	@UseInterceptors(TransformInterceptor)
	@UseFilters(AllExceptionsFilter)
	async getPublishedPosts(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
		@Query('page', new DefaultValuePipe(20), ParseIntPipe) limit: number,
	) {
		return await this.postService.findWithPagination({ page, limit });
	}

	@Get('unpublished')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Ok')
	@UseInterceptors(TransformInterceptor)
	@UseGuards(JwtGuard)
	@UseFilters(AllExceptionsFilter)
	async getUnpublishedPosts(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
		@Query('page', new DefaultValuePipe(20), ParseIntPipe) limit: number,
	) {
		return await this.postService.findWithPagination({ page, limit });
	}

	@Get('owned')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Ok')
	@UseInterceptors(TransformInterceptor)
	@UseGuards(JwtGuard)
	@UseFilters(AllExceptionsFilter)
	async getAllUserPosts(
		@CurrentUser() user: Pick<IUser, '_id'>,
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
		@Query('page', new DefaultValuePipe(20), ParseIntPipe) limit: number,
	) {
		return await this.postService.findAllPostOfUser(user._id, { page, limit });
	}

	@Post('create')
	@UseGuards(JwtGuard)
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Created post successfully')
	@UseInterceptors(TransformInterceptor)
	@UseFilters(AllExceptionsFilter)
	async createPost(
		@Body(new ZodValidationPipe(createPostValidator)) payload: CreatePostDTO,
		@CurrentUser('_id', ParseObjectIdPipe) userId,
	) {
		console.log(userId);
		return await this.postService.create({ author: userId, ...payload });
	}

	@Get(':slug')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Ok')
	@UseInterceptors(TransformInterceptor)
	@UseFilters(AllExceptionsFilter)
	async getPostBySlug(@Param('slug') slug: string) {
		return await this.postService.findOneBySlug(slug);
	}

	@Patch('update/:id')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Updated post successfully')
	@UseInterceptors(TransformInterceptor)
	@UseGuards(JwtGuard)
	// @UsePipes(new ZodValidationPipe(updatePostValidator))
	@UseFilters(AllExceptionsFilter)
	async updatePost(@Param('id', ParseObjectIdPipe) postId: mongoose.Types.ObjectId, @Body() payload: any) {
		return await this.postService.findByIdAndUpdate(postId, payload);
	}
	@Delete('delete/:id')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Updated post successfully')
	@UseInterceptors(TransformInterceptor)
	@UseGuards(JwtGuard)
	@UseFilters(AllExceptionsFilter)
	async deletePost(@Param('id', ParseObjectIdPipe) postId: mongoose.Types.ObjectId, @Body() payload: CreatePostDTO) {
		return await this.postService.findByIdAndDelete(postId);
	}

	@Patch('approve/:id')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Approve post successfully')
	@UseInterceptors(TransformInterceptor)
	@UseGuards(JwtGuard)
	@Roles(UserRole.ADMIN)
	@UseFilters(AllExceptionsFilter)
	async approvePost(@Param('id', ParseObjectIdPipe) postId: mongoose.Types.ObjectId) {
		return await this.postService.approvePost(postId);
	}
	@Patch('publish/:id')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Published post successfully')
	@UseInterceptors(TransformInterceptor)
	@UseGuards(JwtGuard)
	@UseFilters(AllExceptionsFilter)
	async publishPost(@Param('id', ParseObjectIdPipe) postId: mongoose.Types.ObjectId) {
		return await this.postService.publishPost(postId);
	}
}
