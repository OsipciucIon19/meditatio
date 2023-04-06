import { Course } from '../types'

const CourseModel = require('../models/Course')
const UserModel = require('../models/User')
const { ObjectId } = require('mongodb')
const ApiError = require('../exceptions/api-error')

class CourseService {
	async getAllCourses(page = 1, limit = 20) {
		return await CourseModel.aggregate([
			{
				$lookup: {
					from: 'subjects',
					localField: 'subject',
					foreignField: '_id',
					as: 'subject'
				}
			},
			{
				$unwind: '$subject'
			}
		])
			.skip((page - 1) * limit)
			.limit(limit)
	}

	async getCourseByCourseId(courseId: string) {
		const agr = [
			{
				$match: { _id: ObjectId(courseId) }
			},
			{
				$lookup: {
					from: 'subjects',
					localField: 'subject',
					foreignField: '_id',
					as: 'subject'
				}
			}, {
				$unwind: '$subject'
			}
		]

		if (!ObjectId.isValid(courseId)) {
			throw ApiError.BadRequest('Identificatorul nu este valid')
		}
		const course: Course = await CourseModel
			.aggregate(agr)
			.then(([course]) => course)

		if (!course) {
			throw ApiError.BadRequest('Curs cu acest identificator nu exista')
		}

		const teachers = await UserModel.find({
			roles: 'TEACHER',
			subjects: course.subject._id
		})

		return { ...course, teachers }
	}
}

module.exports = new CourseService()
