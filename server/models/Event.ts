import {Event} from '../types'

const { Schema, model } = require('mongoose')
const { ObjectId } = require('mongodb')

const EventSchema: Event = new Schema({
	student: { type: ObjectId, ref: 'User' },
	teacher: { type: ObjectId, ref: 'User' },
	course: { type: ObjectId, ref: 'Course' },
	start: { type: Date },
	end: { type: Date },
	status: { type: String }
})

module.exports = model('Event', EventSchema)
