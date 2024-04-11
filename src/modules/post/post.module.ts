import { Module, Post } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { MongooseModule } from '@nestjs/mongoose'
import { postSchema } from './schemas/post.schema'
import mongoosePaginatePlugin from 'mongoose-paginate-v2'
import mongooseSlugPlugin from 'mongoose-slug-updater'
import { PostRepository } from './post.repository'

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Post.name,
				useFactory: () => {
					postSchema.plugin(mongoosePaginatePlugin)
					postSchema.plugin(mongooseSlugPlugin)
					return postSchema
				}
			}
		])
	],
	controllers: [PostController],
	providers: [PostService, { provide: PostRepository.name, useClass: PostRepository }]
})
export class PostModule {}
