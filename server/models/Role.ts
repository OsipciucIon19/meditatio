import {Role} from '../types'

const { Schema, model } = require('mongoose')

const RoleSchema: Role = new Schema({
    value: { type: String, unique: true, default: 'STUDENT' }
})

module.exports = model('Role', RoleSchema)
