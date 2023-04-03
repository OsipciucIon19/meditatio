import React, {FC, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useFetching} from 'hooks/useFetching'
import EventService from 'services/EventService'
import Calendar from 'components/calendar/Calendar'
import {deleteDuplicateEvents} from 'utils/events'
import ScheduleModal from "../../components/modal/ScheduleModal";

type ScheduleProps = {
    userId: string,
    userRoles: Array<string>
}
const Schedule: FC<ScheduleProps> = ({ userId, userRoles }) => {
    const location = useLocation()
    const [studentEvents, setStudentEvents] = useState([])
    const [teacherEvents, setTeacherEvents] = useState([])
    const [course, setCourse] = useState(null)
    const [fetchStudentEvents,, studentEventsError] = useFetching(async (id, roles): Promise<void> => {
        const response = await EventService.fetchEvents(id, roles)
        setStudentEvents([...studentEvents, ...response.data])
    })
    const [fetchTeacherEvents,, teacherEventsError] = useFetching(async (id, roles): Promise<void> => {
        const response = await EventService.fetchEvents(id, roles)
        setTeacherEvents([...teacherEvents, ...response.data])
        addEventColors(teacherEvents, 'red')
    })


    const addEventColors = (events, color) => {
        events.forEach(event => {
            event.color = color
        })
    }

    useEffect(() => {
        const { teacher, course } = location.state
        fetchStudentEvents(userId, userRoles)
        fetchTeacherEvents(teacher._id, teacher.roles)
        setCourse(course)
    }, [])

    return (
        <div>
            <div>Teacher ID: {location.state.teacher._id}</div>
            <div>Student ID: {userId}</div>
            <div>Student events:</div>
            <div>{!studentEventsError && studentEvents?.map((event, index) => <div key={event._id + index}>{event.title + event.grade}</div>) }</div>
            <div>Teacher events:</div>
            <div>{!teacherEventsError && teacherEvents?.map((event, index) => <div key={event._id + index}>{event.title + event.grade}</div>) }</div>
            <div>Merged events:</div>
            <div>{ deleteDuplicateEvents(studentEvents, teacherEvents).map((event, index) => <li key={event._id + index}>{`${event._id} - ${event.title} - ${event.grade} - ${event.color}`}</li>)}</div>
            <div>Course: {course?.subject.title}</div>
            <Calendar
                events={deleteDuplicateEvents(studentEvents, teacherEvents)}
                isEditable={false}
                course={course}
                // teacherId={teacher._id}
            />
        </div>
    );
}

export default Schedule
