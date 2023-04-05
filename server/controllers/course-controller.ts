import {Request, Response, NextFunction} from 'express'

const courseService = require('../service/course-service')
const url = require('url')
const querystring = require('querystring')

class CourseController {

	async getCourses(req: Request, res: Response, next: NextFunction) {
		try {
			const parsedUrl = url.parse(req.url)
			const { page, limit } = querystring.parse(parsedUrl.query)

			const courses = await courseService.getAllCourses(parseInt(page), parseInt(limit))

			return res.json(courses)
		} catch (err) {
			next(err)
		}
	}
    
	async getCourseById(req: Request, res: Response, next: NextFunction) {
		try {
			const course = await courseService.getCourseByCourseId(req.params.id)
			return res.json(course)
		} catch (err) {
			next(err)
		}
	}
}


module.exports = new CourseController()
