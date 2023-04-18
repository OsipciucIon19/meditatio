import { AxiosResponse } from 'axios'
import { Event } from '../types/event'
import $api from '../http'

export default class EventService {
  static fetchEvents(userId: string, roles: Array<string>): Promise<AxiosResponse<Event[]>> {
    return $api.get<Event[]>(`/get-user-events/${userId}`, {
      params: {
        roles: roles
      }
    })
  }

  static fetchEventContent(eventId:string, userId: string): Promise<AxiosResponse<Event>> {
    return $api.get<Event>(`/access-event/${eventId}`, {
      params: {
        user: userId
      }
    })
  }

  static fetchEventByStartDateAndUserId(userId:string, userRoles: Array<string>, eventStart: string): Promise<AxiosResponse<Event>> {
    return $api.get<Event>('/get-event-from-calendar', {
      params: {
        user: userId,
        roles: userRoles,
        start: eventStart
      }
    })
  }
}
