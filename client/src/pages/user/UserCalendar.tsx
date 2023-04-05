import React, {FC, useEffect, useState} from 'react'
import Calendar from 'components/calendar/Calendar'
import {useTitle} from 'hooks/useTitle'
import {Event} from 'types/event'
import {useFetching} from 'hooks/useFetching'
import EventService from 'services/EventService'

type UserCalendarProps = {
    userId: string,
    userRoles: Array<string>
}

const UserCalendar: FC<UserCalendarProps> = ({ userId, userRoles }) => {
	const [events, setEvents] = useState<Array<Event>>([])
	const [fetchEvents,,] = useFetching(async (id, roles): Promise<void> => {
		const response = await EventService.fetchEvents(id, roles)
		setEvents([...events, ...response.data])
	})

	useTitle('Calendar')

	useEffect(() => {
		setTimeout(() =>
			fetchEvents(userId, userRoles), 1000)
	}, [])

	return (
		<>
			<div>{events.map(event => <li key={event._id}>{event._id}</li>)}</div>
			<Calendar events={events} isEditable={true} />
		</>
	)
}

export default UserCalendar
