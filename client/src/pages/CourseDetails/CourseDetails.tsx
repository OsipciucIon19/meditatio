import React, {FC, useEffect, useState} from 'react'
import {useFetching} from 'hooks/useFetching'
import CourseService from 'services/CourseService'
import {Course} from 'types/course'
import {useNavigate, useParams} from 'react-router-dom'
import Loader from '../../components/ui/Loader/Loader'
import NotFoundPage from '../NotFound/NotFoundPage'
import {useTitle} from '../../hooks/useTitle'
import {Button} from 'reactstrap'

const CourseDetails: FC = () => {
	const navigate = useNavigate()
	const params = useParams()
	const [course, setCourse] = useState<Course>(null)
	const [fetchCourse, isCourseLoading, courseError] = useFetching(async (id): Promise<void> => {
		const response = await CourseService.fetchOneCourse(id)
		setCourse(response.data)
	})

	useEffect(() => {
		fetchCourse(params.id)
	}, [])

	useTitle(`${course?.subject.title}`)
    
	return (
		<div>
			{isCourseLoading ?
				<Loader/> :
				courseError.length ?
					<NotFoundPage/> :
					<div>
						<h1>{`${course?.subject?.title} cl ${course?.subject?.grade}`}</h1>
						<div>{course?.price} lei per ora</div>
						<div>
							{ course?.teachers.map(teacher =>
								<li key={teacher.lastName + teacher.firstName}>{teacher.firstName} <Button
									type="button"
									onClick={() => navigate('/schedule', {
										state: { teacher, course }
									})}
								>Alege acest profesor</Button></li>
							) }
						</div>
					</div>
			}
		</div>
	)
}

export default CourseDetails
