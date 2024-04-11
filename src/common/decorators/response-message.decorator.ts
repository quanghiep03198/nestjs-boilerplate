import { SetMetadata } from '@nestjs/common'

/**
 * @description Decorator trả message về theo response body
 */
export const ResponseMessageKey = 'ResponseMessageKey'
export const ResponseMessage = (message: string) => SetMetadata(ResponseMessageKey, message)
