import { Request, Response, NextFunction } from 'express'

const subjectService = require('../service/subject-service')

class SubjectController {

	async getSubjects(req: Request, res: Response, next: NextFunction) {
		try {
			const subjects = await subjectService.getAllSubjects()
			return res.json(subjects)
		} catch (err) {
			next(err)
		}
	}
}

module.exports = new SubjectController()
