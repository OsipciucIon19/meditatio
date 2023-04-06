import { NextFunction, Request, Response } from 'express'

const eventService = require('../service/event-service')
const url = require('url')

class EventController {
	async getUserEvents(req: Request, res: Response, next: NextFunction) {
		try {
			const parsedUrl = url.parse(req.url)
			const roles = new URLSearchParams(parsedUrl.query).getAll('roles[]')

			const events = await eventService.getEvents(req.params.id, roles)

			const reformattedEvents = events.map(doc => ({
				_id: doc._id,
				student: doc.student,
				teacher: doc.teacher,
				title: doc.title,
				grade: doc.grade,
				start: `${doc.start.toISOString().slice(0, -5)}Z`,
				end: `${doc.end.toISOString().slice(0, -5)}Z`,
				status: doc.status
			}))


			return res.json(reformattedEvents)
		} catch (err) {
			next(err)
		}
	}

	async addUserEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const message = await eventService.addEvent(req.body)

			return res.json(message)
		} catch (err) {
			next(err)
		}
	}

	async addUserEvents(req: Request, res: Response, next: NextFunction) {
		try {
			const message = await eventService.addEvents(req.body)

			return res.json(message)
		} catch (err) {
			next(err)
		}
	}
}

module.exports = new EventController()
