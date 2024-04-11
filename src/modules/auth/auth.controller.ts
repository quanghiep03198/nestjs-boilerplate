import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { ResponseMessage } from '@/common/decorators/response-message.decorator'
import { AllExceptionsFilter } from '@/common/filters/exceptions.filter'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import {
	Body,
	Controller,
	Get,
	Headers,
	HttpCode,
	HttpStatus,
	Post,
	UseFilters,
	UseGuards,
	UseInterceptors,
	UsePipes
} from '@nestjs/common'
import { IUser } from '../user/interfaces/user.interface'
import { AuthService } from './auth.service'
import { RecoverPasswordDTO, loginValidator, recoverPasswordValidator } from './dto/auth.dto'
import { JwtGuard } from './guards/jwt.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	@UseInterceptors(TransformInterceptor)
	@UsePipes(new ZodValidationPipe(loginValidator))
	@UseFilters(AllExceptionsFilter)
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Logged in successfully')
	async login(@CurrentUser() user: IUser) {
		return await this.authService.login(user.email)
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Logged out successfully')
	@UseGuards(JwtGuard)
	@UseInterceptors(TransformInterceptor)
	@UseFilters(AllExceptionsFilter)
	async logout(@CurrentUser() user: IUser, @Headers('Authorization') token: string) {
		return await this.authService.logout(user._id, token)
	}

	@Get('refresh-token')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Refreshed your login session')
	@UseInterceptors(TransformInterceptor)
	@UseFilters(AllExceptionsFilter)
	async refreshToken(@Headers('x-client-id') userId: string) {
		return await this.authService.refreshToken(userId)
	}

	@Post('/recover-password')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Recover password link has been sent to your email')
	@UseInterceptors(TransformInterceptor)
	@UsePipes(new ZodValidationPipe(recoverPasswordValidator))
	@UseFilters(AllExceptionsFilter)
	async recoverPassword(@Body() payload: RecoverPasswordDTO) {
		return await this.authService.recoverPassword(payload.email)
	}
}
