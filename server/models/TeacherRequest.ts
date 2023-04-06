import { TeacherRequest } from '../types'

const { Schema, model } = require('mongoose')
const { ObjectId } = require('mongodb')

const TeacherRequestSchema: TeacherRequest = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  subjects: [{ type: ObjectId, ref: 'Subject' }],
  phoneNumber: { type: String, required: true },
  status: { type: String, required: true }
})

module.exports = model('Teacher-Request', TeacherRequestSchema)