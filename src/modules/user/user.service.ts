import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterDTO } from './dto/user.dto';
import { IUserRepository } from './interfaces/user.repository.interface';

@Injectable()
export class UserService {
	constructor(@Inject(UserRepository.name) private readonly userRepository: IUserRepository) {}

	async registerUser(payload: RegisterDTO) {
		const existedUser = await this.userRepository.findOneByEmail(payload.email);
		if (existedUser) throw new ConflictException('Email already existed');
		return await this.userRepository.create(payload);
	}
}
