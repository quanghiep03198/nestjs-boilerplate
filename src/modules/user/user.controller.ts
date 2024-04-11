import { AllExceptionsFilter } from '@/common/filters/exceptions.filter'
import { UserService } from './user.service'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	UseFilters,
	UsePipes
} from '@nestjs/common'
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import { RegisterDTO, registerValidator } from './dto/user.dto'
import { Response } from 'express'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ZodValidationPipe(registerValidator))
	@UseFilters(AllExceptionsFilter)
	async registerUser(@Body() payload: RegisterDTO, @Res() res: Response) {
		const newUser = await this.userService.registerUser(payload)
		return res.json(newUser)
	}
}
