import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	/**
	 *	@description Bắt tất cả các exceptions được throw
	 * @param {HttpException | Error} exception
	 * @param {ArgumentsHost} host
	 */
	catch(exception: HttpException | Error, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();
		const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const responseBody = {
			message: exception.message,
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
		};
		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
