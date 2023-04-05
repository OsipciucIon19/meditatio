import {Token} from '../types'

const jwt = require('jsonwebtoken')
const tokenModel = require('../models/Token')

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '10h'}, null)
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '1h'}, null)
		return {
			accessToken,
			refreshToken
		}
	}

	validateAccessToken(token: string) {
		try {
			return jwt.verify(token, process.env.JWT_ACCESS_SECRET, null, null)
		} catch (err) {
			return null
		}
	}

	validateRefreshToken(token: string) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET, null, null)
		} catch (err) {
			return null
		}
	}

	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await tokenModel.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}
		return await tokenModel.create({ user: userId, refreshToken })
	}

	async removeToken(refreshToken: string) {
		return tokenModel.deleteOne({ refreshToken })
	}

	async findToken(refreshToken: string) : Promise<Token> {
		return tokenModel.findOne({ refreshToken })
	}
}

module.exports = new TokenService()
