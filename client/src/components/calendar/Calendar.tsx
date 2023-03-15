import React, {FC, useEffect, useRef, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import roLocale from '@fullcalendar/core/locales/ro'
import {StyledCalendar} from './Calendar.styled'
import {Event} from 'types/event'
import {Button, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import DatePicker from 'react-widgets/DatePicker'
import Localization from 'react-widgets/Localization'
import {DateLocalizer} from 'react-widgets/IntlLocalizer'

type CalendarProps = {
    events: Array<Event>
    isEditable: boolean
}

const Calendar: FC<CalendarProps> = ({ events, isEditable= false }) => {
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
                <b>{eventInfo.event.title}</b>, {eventInfo.timeText}
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
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Localization date={new DateLocalizer({culture: 'ro', firstOfWeek: 1})}>
                        <Form>
                            <label htmlFor="title">Title:</label>
                            <Input />
                            <label>
                                From:
                            </label>
                            <DatePicker
                                value={selectedEvent}
                                onChange={(value) => setSelectedEvent(value)}
                                includeTime
                            />
                            <label>
                                To:
                            </label>
                            <DatePicker
                                value={new Date(selectedEvent.getTime() + 60 * 60 * 1000)}
                                disabled
                                includeTime
                            />
                        </Form>
                    </Localization>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        toggle()
                        console.log(selectedEvent)
                    }
                    }>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </StyledCalendar>
    );
}

export default Calendar;