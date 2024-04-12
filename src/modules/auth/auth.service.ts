import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import mongoose, { isValidObjectId } from 'mongoose';
import { TokenService } from '../token/token.service';
import { IUser } from '../user/interfaces/user.interface';
import { UserRepository } from '../user/user.repository';
import { LoginDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		@Inject(UserRepository.name) private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly tokenService: TokenService,
		private readonly mailerService: MailerService,
	) {}

	async validateUser(payload: LoginDTO) {
		const user = await this.userRepository.findOneByEmail(payload.email);
		if (!user) throw new NotFoundException('User not found');
		if (!user.authenticate(payload.password)) throw new BadRequestException('Incorrect password');
		if (!user.email_verified_at) throw new UnauthorizedException('Email has not verified yet');
		return user;
	}

	async generateToken(payload: Pick<IUser, '_id' | 'email'>) {
		return await this.jwtService.signAsync(payload, {
			secret: this.configService.get('JWT_SECRET'),
		});
	}

	async login(email) {
		const user = (await this.userRepository.findOneByEmail(email)).set('password', undefined);
		const accessToken = await this.generateToken({
			_id: user._id,
			email: user.email,
		});
		await this.tokenService.findOrCreate(user._id);
		return { user: _.omit(user, ['password']), accessToken };
	}

	async logout(userId: mongoose.Types.ObjectId, token: string) {
		if (!token) throw new UnauthorizedException('Access token must be provided');
		const accessToken = token.replace('Bearer', '').trim();
		const user = await this.userRepository.findOneById(userId);
		if (!user) throw new NotFoundException('User could not be found');
		return await this.tokenService.revokeToken(user._id, accessToken);
	}

	async refreshToken(userId: string) {
		if (!userId) throw new UnauthorizedException('Missing credential user ID');
		if (!isValidObjectId(userId)) throw new UnauthorizedException('Invalid client ID');
		const user = await this.userRepository.findOneById(new mongoose.Types.ObjectId(userId));
		if (!user) throw new NotFoundException('User could not be found');
		return await this.generateToken({ _id: user._id, email: user.email });
	}

	async recoverPassword(email: string, origin: string) {
		const user = await this.userRepository.findOneByEmail(email);
		if (!user) throw new NotFoundException('User could not be found');
		const accessToken = await this.generateToken({ _id: user._id, email: user.email });
		return await this.mailerService.sendMail({
			to: user.email,
			subject: 'Request to reset your password',
			template: 'reset-password',
			context: {
				url: `${origin}/reset-password?token=${accessToken}`,
				display_name: user.display_name,
			},
		});
	}

	async resetPassword(email, newPassword: string) {
		const user = await this.userRepository.findOneByEmail(email);
		if (!user) throw new NotFoundException('User could not be found');
		user.password = newPassword;
		return await user.save();
	}

	async verifyEmail(email) {
		const user = await this.userRepository.findOneByEmail(email);
		if (!user) throw new NotFoundException('User could not be found');
		return await this.userRepository.findByIdAndUpdate(user._id, { email_verified_at: new Date() });
	}
}
