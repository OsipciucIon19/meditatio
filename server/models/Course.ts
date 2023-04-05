import {Course} from '../types'

const { Schema, model } = require('mongoose')
const { ObjectId } = require('mongodb')

const CourseSchema: Course = new Schema({
	subject: { type: ObjectId, ref: 'Subject' },
	description: { type: String },
	imagePath: { type: String },
	price: { type: Number },
	status: { type: String },
	content: { type: String }
})

module.exports = model('Course', CourseSchema)
