import React, {FC, useEffect, useRef, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import roLocale from '@fullcalendar/core/locales/ro'
import {StyledCalendar} from './Calendar.styled'

const Calendar: FC = (props) => {
    const calendarRef = useRef(null);
    const isMobileScreen = window.screen.width < 768

    const events = [
        {
            id: '12',
            title: 'Matematică cl 1',
            start: new Date().toISOString().replace(/T.*$/, '') + 'T11:00:00',
            end: new Date().toISOString().replace(/T.*$/, '') + 'T11:50:00'
        },
        {
            id: '345',
            title: 'Limba română cl 4',
            start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00',
            end: new Date().toISOString().replace(/T.*$/, '') + 'T15:01:00'
        }
    ]

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
    

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.event.title}</b>, {eventInfo.timeText}
            </>
        )
    }

    return (
        <StyledCalendar>
            <FullCalendar
                ref={calendarRef}
                // headerToolbar={{
                //     left: "prev,today,next",
                //     center: "title",
                //     right: isMobileScreen ? 'timeGridWeek' : 'timeGridDay'
                // }}
                locale={roLocale}
                nowIndicator={true}
                plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
                initialView={isMobileScreen ? 'timeGridDay' : 'timeGridWeek'}
                weekends={true}
                initialEvents={events}
                eventContent={renderEventContent}
                editable={true}
                selectable
                selectMirror={true}
                dayMaxEvents={true}
                allDaySlot={false}
            />
        </StyledCalendar>
    );
}

export default Calendar;