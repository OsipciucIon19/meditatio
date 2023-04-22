import React, { FC, useEffect, useState } from 'react'
import { useFetching } from 'hooks/useFetching'
import CourseService from 'services/CourseService'
import { Course } from 'types/course'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/ui/Loader/Loader'
import NotFoundPage from '../NotFound/NotFoundPage'
import { useTitle } from '../../hooks/useTitle'
import { Button, Col, Row } from 'reactstrap'
import { StyledCourseDetails } from './CourseDetails.styled'
import { useTranslation } from 'react-i18next'

const CourseDetails: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [course, setCourse] = useState<Course>(null)
  const { t } = useTranslation()
  const [fetchCourse, isCourseLoading, courseError] = useFetching(async (id): Promise<void> => {
    const response = await CourseService.fetchOneCourse(id)
    setCourse(response.data)
  })

  useEffect(() => {
    const fetchData = async () => {
      await fetchCourse(id)
    }
    fetchData().catch(console.error)
  }, [id])

  useTitle(`${course?.subject.title}`)

  return (
    <StyledCourseDetails>
      {isCourseLoading ?
        <Loader/> :
        courseError.length ?
          <NotFoundPage/> :
          <>
            <Row>
              <Col>
                <main className="course-content">
                  <h1>{`${course?.subject?.title} ${t('courses-class')} ${course?.subject?.grade}`}</h1>
                  <div className="course-price my-1"><b>{t('price-per-hour')} <span className="course-price-value">{course?.price} lei / oră</span></b></div>
                  <div className="course-description my-1">
                    <b>{t('about-this-course')}</b>
                    <div dangerouslySetInnerHTML={{
                      __html: course?.description
                    }} />
                  </div>
                </main>
              </Col>
              <Col>
                <div
                  className="course-image"
                  style={{ background: `url(/images/courses/${course?.imagePath})` }}
                >
                  <p><b>{t('unique-courses-from')}<i> meditat.io</i></b></p>
                  <h3>{course?.subject?.title}</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2 className="text-center my-3">{t('available-teachers-for-this-course')}:</h2>
                <div className="teacher-cards d-flex">
                  {
                    course?.teachers.length ?
                      course?.teachers.map(teacher =>
                        <div className="teacher-card m-2" key={teacher.lastName + teacher.firstName}>
                          <img
                            src={`https://ui-avatars.com/api/?name=${teacher.firstName}+${teacher.lastName}&size=200`}
                            alt="avatar"
                            style={{ borderRadius: '5px' }}
                          />
                          <div className="my-2 text-center">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <Button
                            className="d-flex m-auto"
                            type="button"
                            onClick={() => navigate('/schedule', {
                              state: { teacher, course }
                            })}
                          >{t('choose-this-teacher')}</Button>
                        </div>
                      ) :
                      <p className="text-center mx-auto my-2">{t('no-available-teachers')}</p>
                  }
                </div>
              </Col>
            </Row>
          </>

      }
    </StyledCourseDetails>
  )
}

export default CourseDetails
