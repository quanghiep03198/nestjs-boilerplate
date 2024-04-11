import { IBaseRepository } from '@/base/interfaces/base.repository.interface'
import { UserDocument } from '../schemas/user.schema'

export interface IUserRepository extends IBaseRepository<UserDocument> {
	findOneByEmail: (email: string) => Promise<UserDocument | null>
}
