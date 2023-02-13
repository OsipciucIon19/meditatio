import {TeacherRequest, User} from "../types";

const UserModel = require('../models/User')
const TeacherRequestModel = require('../models/TeacherRequest')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const Role = require('../models/Role')
const ApiError = require('../exceptions/api-error')
const constants = require('../constants')
const { ObjectId } = require('mongodb')

class UserService {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Utilizatorul cu posta ${email} deja exista`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const userRole = await Role.findOne({ value: constants.ROLE_STUDENT })
        const activationLink = uuid.v4()

        const user = await UserModel.create({ email, password: hashPassword, roles: [userRole.value], activationLink })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Linkul de activare este incorect')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('Utilizatorul cu asa email deja exista')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Parola gresita')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
    
    async requestTeacherRoles(data: TeacherRequest) {
        const {email, password} = data
        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest(`Utilizatorul cu posta ${email} deja exista`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        return await TeacherRequestModel.create({ ...data, password: hashPassword, status: 'NEW' })
    }
    
    async validateTeacherRoles(requestId: string) {
        if (!ObjectId.isValid(requestId)) {
            throw ApiError.BadRequest('Identificatorul nu este valid')
        }
        const request = await TeacherRequestModel.findByIdAndUpdate(ObjectId(requestId), {status: 'ACCEPTED'})
        if (!request) {
            throw ApiError.BadRequest('Cererea nu a fost gasita')
        } else if (request.status === 'ACCEPTED') {
            throw ApiError.BadRequest('Cererea a fost deja acceptata')
        }
        
        const teacherRole = await Role.findOne({ value: constants.ROLE_TEACHER })
        const activationLink = uuid.v4()
        const {firstName, lastName, email, password, subjects, phoneNumber} = request
        const user = await UserModel.create({ 
            firstName, lastName, email, password, roles: [teacherRole.value], activationLink, subjects, phoneNumber 
        })
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
    
    async rejectTeacherRoles(requestId: string) {
        if (!ObjectId.isValid(requestId)) {
            throw ApiError.BadRequest('Identificatorul nu este valid')
        }
        const request = await TeacherRequestModel.findByIdAndUpdate(ObjectId(requestId), {status: 'REFUSED'})
        if (!request) {
            throw ApiError.BadRequest('Cererea nu a fost gasita')
        } else if (request.status === 'ACCEPTED') {
            throw ApiError.BadRequest('Cererea a fost deja acceptata')
        }
        return request.email
    }

    async logout(refreshToken: string) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async getAllUsers(): Promise<Array<User>> {
        return UserModel.find()
    }
}

module.exports = new UserService()
