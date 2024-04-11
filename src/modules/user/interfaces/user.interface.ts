import mongoose from 'mongoose'

export interface IUser {
	_id: mongoose.Types.ObjectId
	display_name: string
	email: string
	password: string
	email_verified_at: Date
	picture: string | null
	authenticate(password: string): boolean
}
