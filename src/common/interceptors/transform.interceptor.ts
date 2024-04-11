import { ResponseMessageKey } from '@/common/decorators/response-message.decorator';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
	data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
	constructor(
		private reflector: Reflector,
		private readonly httpAdapterHost: HttpAdapterHost,
	) {}
	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		const responseMessage = this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ?? '';
		const { httpAdapter } = this.httpAdapterHost;
		return next.handle().pipe(
			map((data) => ({
				data,
				statusCode: context.switchToHttp().getResponse().statusCode,
				message: responseMessage,
				timestamp: new Date().toISOString(),
				path: httpAdapter.getRequestUrl(context.switchToHttp().getRequest()),
			})),
		);
	}
}
