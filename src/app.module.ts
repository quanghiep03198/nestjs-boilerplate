import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { MailerModule } from './modules/mailer/mailer.module'
import { UserModule } from './modules/user/user.module'
import { PostModule } from './modules/post/post.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
			load: [
				/**
				 * Import thêm các exteneded configs khác nếu muốn vào đây
				 * @example
				 * 	const redisConfigs = () => ({
				 * 		host: '127.0.0.1',
				 * 		port: 6379,
				 * 		tls: true
				 * 	})
				 */
			]
		}),
		DatabaseModule,
		UserModule,
		AuthModule,
		MailerModule,
		PostModule
	],
	controllers: []
})
export class AppModule {}
