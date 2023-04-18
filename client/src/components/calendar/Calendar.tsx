import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import roLocale from '@fullcalendar/core/locales/ro'
import { StyledCalendar } from './Calendar.styled'
import { Event } from 'types/event'
import { Button } from 'reactstrap'
import ScheduleModal from '../modal/ScheduleModal'
import { Course } from '../../types/course'
import { User } from '../../types/user'
import ViewEventModal from '../modal/ViewEventModal'
import { useFetching } from '../../hooks/useFetching'
import EventService from '../../services/EventService'
import { Context } from '../../App'

type CalendarProps = {
  events: Array<Event>
  isEditable: boolean
  course?: Course
  studentId?: string
  teacher?: User
}

const Calendar: FC<CalendarProps> = ({ events, isEditable = false, course, studentId, teacher }) => {
  const { store } = useContext(Context)
  const calendarRef = useRef(null)
  const [selectedEvent, setSelectedEvent] = useState(new Date())
  const [fetchedEvent, setFetchedEvent] = useState<Event>(null)
  const isMobileScreen = window.screen.width < 768
  const [scheduleModal, setScheduleModal] = useState(false)
  const [viewEventModal, setViewEventModal] = useState(false)
  const [fetchEvent, isEventLoading] = useFetching(async (userId, userRoles, eventStart): Promise<void> => {
    const response = await EventService.fetchEventByStartDateAndUserId(userId, userRoles, eventStart)
    setFetchedEvent(response.data)
  })

  const toggleScheduleModal = () => setScheduleModal(!scheduleModal)
  const toggleViewEventModal = () => setViewEventModal(!viewEventModal)


  useEffect(() => {
    window.onresize = () => {
      const { current: calendarDom } = calendarRef
      const API = calendarDom ? calendarDom.getApi() : null

      window.screen.width > 768 ? API.changeView('timeGridWeek') : API.changeView('timeGridDay')
    }

    return () => {
      window.onresize = null
    }
  }, [])

  const handleDateClick = (eventInfo) => {
    setSelectedEvent(eventInfo.date)
    setScheduleModal(true)
  }

  const handleEventClick = async (clickInfo) => {
    setViewEventModal(true)
    await fetchEvent(store.user._id, store.user.roles, clickInfo.event.startStr)
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        {eventInfo.event.title ? <><b>{eventInfo.event.title}</b>, {eventInfo.timeText}</> : eventInfo.timeText}
      </>
    )
  }

  return (
    <StyledCalendar>
      <Button onClick={() => setScheduleModal(true)}>Programează o lecție</Button>
      <FullCalendar
        ref={calendarRef}
        locale={roLocale}
        nowIndicator={true}
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
        initialView={isMobileScreen ? 'timeGridDay' : 'timeGridWeek'}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        editable={isEditable}
        selectable
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={false}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      <ScheduleModal
        modal={scheduleModal}
        toggle={toggleScheduleModal}
        event={selectedEvent}
        course={course}
        studentId={studentId}
        teacher={teacher}
      />
      <ViewEventModal
        modal={viewEventModal}
        toggle={toggleViewEventModal}
        event={fetchedEvent}
        isEventLoading={isEventLoading}
        userId={store.user._id}
      />
    </StyledCalendar>
  )
}

export default Calendar
