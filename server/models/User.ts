import {User} from '../types'

const { Schema, model } = require('mongoose')
const { ObjectId } = require('mongodb')

const UserSchema: User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: { type: Array, ref: 'Role' },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    subjects: [{ type: ObjectId, ref: 'Subject' }],
    phoneNumber: { type: String, required: true }
})

module.exports = model('User', UserSchema)
