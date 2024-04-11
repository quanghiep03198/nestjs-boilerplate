import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description Decorator extract thông tin user từ token gửi lên theo token
 */
export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const user = request.user;
	return data ? user?.[data] : user;
});
