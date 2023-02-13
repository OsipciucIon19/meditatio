import {Course} from '../types'

const CourseModel = require('../models/Course')
const {ObjectId} = require('mongodb');
const ApiError = require("../exceptions/api-error");

class CourseService {
    async addCourse(course: Course) {
        
    }
    
    async getAllCourses() {
        return CourseModel.find()
    }
    
    async getCourseByCourseId(courseId: string) {
        if (!ObjectId.isValid(courseId)) {
            throw ApiError.BadRequest('Identificatorul nu este valid')
        }
        const course: Course = await CourseModel.findById(ObjectId(courseId))
        
        if (!course) {
            throw ApiError.BadRequest('Curs cu acest identificator nu exista')
        }
        
        return course
    }
}

module.exports = new CourseService()
