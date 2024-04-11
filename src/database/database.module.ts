import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					uri: configService.get<string>('MONGO_URI'),
					maxPoolSize: +configService.get<string>('MONGO_MAX_POOL_SIZE'),
					connectTimeoutMS: +configService.get<string>('MONGO_CONNECTION_TIMEOUT'),
				};
			},
		}),
		// Add more databases configurations here, like MySQL, PostgreSQL, etc.
	],
	exports: [MongooseModule],
})
export class DatabaseModule {}
