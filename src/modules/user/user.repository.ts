import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { IUserRepository } from './interfaces/user.repository.interface';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from '@/base/base.abstract.repository';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserDocument> implements IUserRepository {
	constructor(@InjectModel(User.name) protected userModel: Model<UserDocument>) {
		super(userModel);
	}

	async findOneByEmail(email: string) {
		return await this.userModel.findOne({ email });
	}
}
