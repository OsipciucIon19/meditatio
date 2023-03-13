import React, {FC, useEffect, useRef} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import roLocale from '@fullcalendar/core/locales/ro'
import {StyledCalendar} from './Calendar.styled'
import {Event} from 'types/event'

type CalendarProps = {
    events: Array<Event>
}

const Calendar: FC<CalendarProps> = ({ events }) => {
    const calendarRef = useRef(null);
    const isMobileScreen = window.screen.width < 768

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
                events={events}
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