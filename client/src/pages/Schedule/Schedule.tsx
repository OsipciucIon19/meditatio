import React, {FC, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useFetching} from 'hooks/useFetching'
import EventService from 'services/EventService'
import Calendar from 'components/calendar/Calendar'
import {deleteDuplicateEvents} from 'utils/events'

type ScheduleProps = {
    userId: string
    userRoles: Array<string>
}
const Schedule: FC<ScheduleProps> = React.memo(({ userId, userRoles }) => {
	const location = useLocation()
	const [studentEvents, setStudentEvents] = useState([])
	const [teacherEvents, setTeacherEvents] = useState([])
	const { teacher, course } = location.state
	const {_id: teacherId, roles: teacherRoles} = teacher
	const [fetchStudentEvents,,] = useFetching(async (id, roles): Promise<void> => {
		const response = await EventService.fetchEvents(id, roles)
		setStudentEvents([...studentEvents, ...response.data])
	})
	const [fetchTeacherEvents,,] = useFetching(async (id, roles): Promise<void> => {
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
		const fetchData = async () => {
			await fetchStudentEvents(userId, userRoles)
			await fetchTeacherEvents(teacherId, teacherRoles)
		}
		fetchData().catch(console.error)
	}, [])

	return (
		<>
			<Calendar
				events={deleteDuplicateEvents(studentEvents, teacherEvents)}
				isEditable={false}
				course={course}
				studentId={userId}
				teacher={teacher}
			/>
		</>
	)
})

export default Schedule
