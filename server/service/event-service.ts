import { Event } from '../types'

const EventModel = require('../models/Event')
const constants = require('../constants')
const { ObjectId } = require('mongodb')
const ApiError = require('../exceptions/api-error')
const fs = require('fs')
const path = require('path')

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
    const { _id } = await EventModel.create({ ...data, status: 'NEW' })
    return _id.toString()
  }

  async addEvents(data: Array<Event>) {
    data.forEach((event) => {
      EventModel.create({ ...event, status: 'NEW' })
    })
    return 'Evenimenntele au fost adaugate cu succes'
  }

  async accessEventById(eventId: string, userId: string) {
    const currentTime = new Date('2023-04-17T10:55:01.000Z')
    const event = await EventModel.aggregate([
      {
        $match: { _id: ObjectId(eventId) }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'course'
        }
      },
      {
        $unwind: '$course'
      }
    ]).then(([event]) => event)

    if (!event) {
      throw ApiError.BadRequest('Nu exista eveniment cu asa identificator')
    }

    if (event.student.toString() !== userId && event.teacher.toString() !== userId) {
      throw ApiError.RestrictedAccessError()
    }

    const eventStartTime = new Date(event.start.setMinutes(event.start.getMinutes() - 5))
    if (currentTime < eventStartTime && currentTime.getDate() !== eventStartTime.getDate()) {
      throw ApiError.RestrictedAccessError()
    }

    const filePath = path.join(__dirname, '../data/course-contents', event.course.content)
    const readFilePromise: (filePath: string, encoding: string) => Promise<string> = (filePath, encoding) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }

    const getFileData = async () => {
      try {
        const data: string = await readFilePromise(filePath, 'utf8')
        return JSON.parse(data)
      } catch (err) {
        throw ApiError.BadRequest(err)
      }
    }

    event.content = await getFileData()

    return event
  }

  async getEventByUserInfo(userId: string, userRoles: Array<string>, startTime) {
    let candidates
    if (userRoles.includes('STUDENT')) {
      candidates = await EventModel.find({ student: userId })
    } else {
      candidates = await EventModel.find({ teacher: userId })
    }

    return candidates.filter(candidate => candidate.start.getTime() === startTime.getTime())[0]
  }
}

module.exports = new EventService()
