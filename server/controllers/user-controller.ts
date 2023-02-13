import {NextFunction, Request, Response} from "express";

const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Eroare de validare', errors.array()))
            }
            const { email, password } = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }
    
    async requestTeacherRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Eroare de validare', errors.array()))
            }
            const requestData = await userService.requestTeacherRoles(req.body)
            return res.json(requestData)
        } catch (err) {
            next(err)
        }
    }
    
    async validateTeacherRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Eroare de validare', errors.array()))
            }
            const teacherData = await userService.validateTeacherRoles(req.params.id)
            res.cookie('refreshToken', teacherData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(201).send(`Cererea de validare profesor pentru ${teacherData.email} a fost validata cu succes`)
        } catch (err) {
            next(err)
        }
    }
    
    async rejectTeacherRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Eroare de validare', errors.array()))
            }
            const email = await userService.rejectTeacherRoles(req.params.id)
            return res.status(200).send(`Cererea de validare profesor pentru ${email} a fost refuzata`)
        }catch (err) {
            next(err)
        }
    }
    
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (err) {
            next(err)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(303, '/')
        } catch (err) {
            next(err)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (err) {
            next(err)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (err) {
            next(err)
        }
    }
}


module.exports = new UserController()
