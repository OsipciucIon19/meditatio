import {Request, Response, NextFunction} from 'express'

const courseService = require('../service/course-service')

class CourseController {

    async getCourses(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await courseService.getAllCourses()
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
