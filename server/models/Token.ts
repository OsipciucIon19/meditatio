import {Token} from '../types'

const { Schema, model } = require('mongoose')

const TokenSchema: Token = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true },
})

module.exports = model('Token', TokenSchema)
