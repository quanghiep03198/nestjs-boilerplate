import { PipeTransform } from '@nestjs/common'
import mongoose, { isValidObjectId } from 'mongoose'

export class ParseObjectIdPipe implements PipeTransform {
	transform(value: any) {
		if (!isValidObjectId(value)) throw new Error('Invalid object ID')
		return new mongoose.Types.ObjectId(value)
	}
}
