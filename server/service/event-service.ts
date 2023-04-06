import { Event } from '../types'

const EventModel = require('../models/Event')
const constants = require('../constants')
const { ObjectId } = require('mongodb')

class EventService {
	async getEvents(id: string, roles: string | string[]): Promise<Array<Event>> {
		const aggregate = (userRole) => [
			{ $match: { [userRole]: ObjectId(id) } },
			{
				$lookup: {
					from: 'courses',
					localField: 'course',
					foreignField: '_id',
					as: 'course'
				}
			},{ $unwind: '$course' },
			{
				$lookup: {
					from: 'subjects',
					localField: 'course.subject',
					foreignField: '_id',
					as: 'course.subject'
				}
			},
			{ $unwind: '$course.subject' },
			{
				$project: {
					_id: '$_id',
					title: '$course.subject.title',
					grade: '$course.subject.grade',
					start: '$start',
					end: '$end',
					student: '$student',
					teacher: '$teacher',
					status: '$status'
				}
			}
		]
		if (roles.includes(constants.ROLE_STUDENT)) {
			return EventModel.aggregate(aggregate('student'))
		} else if (roles.includes(constants.ROLE_TEACHER)) {
			return EventModel.aggregate(aggregate('teacher'))
		}
		return []
	}

	async addEvent(data: Event) {
		await EventModel.create({ ...data, status: 'NEW' })
		return 'Evenimentul a fost adaugat cu succes'
	}

	async addEvents(data: Array<Event>) {
		data.forEach((event) => {
			EventModel.create({ ...event, status: 'NEW' })
		})
		return 'Evenimenntele au fost adaugate cu succes'
	}
}

module.exports = new EventService()
