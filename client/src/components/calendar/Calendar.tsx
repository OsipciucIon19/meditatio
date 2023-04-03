import React, {FC, useEffect, useRef, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import roLocale from '@fullcalendar/core/locales/ro'
import {StyledCalendar} from './Calendar.styled'
import {Event} from 'types/event'
import {Button} from 'reactstrap'
import ScheduleModal from "../modal/ScheduleModal";
import {Course} from "../../types/course";

type CalendarProps = {
    events: Array<Event>
    isEditable: boolean
    course?: Course
}

const Calendar: FC<CalendarProps> = ({ events, isEditable= false, course }) => {
    const calendarRef = useRef(null);
    const [selectedEvent, setSelectedEvent] = useState(new Date())
    const isMobileScreen = window.screen.width < 768
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)


    useEffect(() => {
        window.onresize = () => {
            const {current: calendarDom} = calendarRef;
            const API = calendarDom ? calendarDom.getApi() : null;

            window.screen.width > 768 ? API.changeView('timeGridWeek') : API.changeView('timeGridDay')
        }
        return () => {
            window.onresize = null
        }
    },[window.screen.width])

    const handleDateClick = (eventInfo) => {
        setSelectedEvent(eventInfo.date)
        setModal(true)
    }

    function renderEventContent(eventInfo) {
        return (
            <>
                { eventInfo.event.title ? <><b>{eventInfo.event.title}</b>, {eventInfo.timeText}</> : eventInfo.timeText }
            </>
        )
    }

    return (
        <StyledCalendar>
            <Button onClick={() => setModal(true)}>Add schedule</Button>
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
            />
            <ScheduleModal
                modal={modal}
                toggle={toggle}
                event={selectedEvent}
                course={course}
            />
        </StyledCalendar>
    );
}

export default Calendar;