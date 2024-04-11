import mongoose from 'mongoose'

export interface IPost {
	slug: string
	title: string
	description: string
	content: string
	is_approved: boolean
	is_published: boolean
	author: mongoose.Types.ObjectId
}
