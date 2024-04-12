import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { User, userSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeatureAsync([
			{
				imports: [ConfigModule],
				inject: [ConfigService],
				name: User.name,
				useFactory: (configService: ConfigService) => {
					userSchema.methods.authenticate = function (password: string) {
						console.log(compareSync(password, this.password));
						return compareSync(password, this.password);
					};
					userSchema.pre('save', function (next) {
						this.password = hashSync(this.password, genSaltSync(+configService.get('BCRYPT_SALT_ROUND')));
						next();
					});
					return userSchema;
				},
			},
		]),
	],
	controllers: [UserController],
	providers: [UserService, { provide: UserRepository.name, useClass: UserRepository }],
	exports: [{ provide: UserRepository.name, useClass: UserRepository }],
})
export class UserModule {}
