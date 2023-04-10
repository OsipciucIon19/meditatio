import React, { FC, useEffect, useState } from 'react'
import Calendar from 'components/calendar/Calendar'
import { useTitle } from 'hooks/useTitle'
import { Event } from 'types/event'
import { useFetching } from 'hooks/useFetching'
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
    const fetchData = async () => {
      await fetchEvents(userId, userRoles)
    }
    fetchData().catch(console.error)

  }, [])

  return (
    <>
      <h1>Vezi aici agenda ta</h1>
      <Calendar events={events} isEditable={true} />
    </>
  )
}

export default UserCalendar
