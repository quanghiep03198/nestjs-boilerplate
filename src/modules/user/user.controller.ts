import { ResponseMessage } from '@/common/decorators/response-message.decorator';
import { AllExceptionsFilter } from '@/common/filters/exceptions.filter';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseFilters,
	UseInterceptors,
	UsePipes,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RegisterDTO, registerValidator } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Registered successfully')
	@UsePipes(new ZodValidationPipe(registerValidator))
	@UseInterceptors(TransformInterceptor)
	@UseFilters(AllExceptionsFilter)
	async registerUser(@Body() payload: RegisterDTO, @Req() req: Request) {
		const origin = `${req.protocol}://${req.get('Host')}/v1/api/auth/verify-email`;
		console.log(origin);
		return await this.userService.registerUser(payload, origin);
	}
}
