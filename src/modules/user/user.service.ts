import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { RegisterDTO } from './dto/user.dto'
import { IUserRepository } from './interfaces/user.repository.interface'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class UserService {
	constructor(
		@Inject(UserRepository.name) private readonly userRepository: IUserRepository,
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService
	) {}

	async registerUser(payload: RegisterDTO, origin: string) {
		const existedUser = await this.userRepository.findOneByEmail(payload.email)
		if (existedUser) throw new ConflictException('Email already existed')
		const newUser = await this.userRepository.create(payload)
		const accessToken = await this.jwtService.signAsync(
			{ _id: newUser._id, email: newUser.email },
			{ secret: this.configService.get('JWT_SECRET') }
		)
		return await this.mailerService.sendMail({
			to: newUser.email,
			subject: 'Verify your email',
			template: 'verify-email',
			context: {
				url: `${origin}?token=${accessToken}`,
				display_name: newUser.display_name
			}
		})
	}
}
