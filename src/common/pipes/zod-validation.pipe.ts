import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
	constructor(private schema: ZodSchema) {}

	transform(value: unknown, metadata: ArgumentMetadata) {
		try {
			console.log('payload :>>>>', value);
			return this.schema.parse(value);
		} catch (error) {
			throw new BadRequestException(error.issues.at(0).message);
		}
	}
}
