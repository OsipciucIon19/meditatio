import { AxiosResponse } from 'axios'
import { Event } from '../types/event'
import $api from '../http'

export default class EventService {
	static fetchEvents(userId: string, roles): Promise<AxiosResponse<Event[]>> {
		return $api.get<Event[]>(`/get-user-events/${userId}`, {
			params: {
				roles: roles
			}
		})
	}
}
