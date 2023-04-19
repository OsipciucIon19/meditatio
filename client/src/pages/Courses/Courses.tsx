import React, { useEffect, useState } from 'react'
import CourseList from 'components/courses/CourseList'
import Loader from 'components/ui/Loader/Loader'
import { useFetching } from 'hooks/useFetching'
import CourseService from 'services/CourseService'
import { Course } from 'types/course'
import { getPageCount } from 'utils/pages'
import { useTitle } from 'hooks/useTitle'
import HeroSection from 'components/hero/HeroSection'
import coursesImage from 'assets/images/home/course-hero-image.webp'
import { useTranslation } from 'react-i18next'

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const { t } = useTranslation()

  const [fetchCourses, areCoursesLoading, courseError] = useFetching(async (limit, page): Promise<void> => {
    const response = await CourseService.fetchCourses(limit, page)

    setCourses([...courses, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  const heroData = {
    title: t('courses-hero-title'),
    body: <>
      <p>{t('courses-hero-1-paragraph')}</p>
      <p>{t('courses-hero-2-paragraph')}</p>
    </>,
    image: coursesImage
  }

  useTitle('Cursuri Online')

  useEffect(() => {
    const fetchData = async () => {
      await fetchCourses(limit, page)
    }
    fetchData().catch(console.error)
  }, [page, limit])

  return (
    <div className="courses">
      <HeroSection
        title={heroData.title}
        body={heroData.body}
        inverted={true}
        image={heroData.image}
      />
      <h2 style={{ textAlign: 'center' }}>
        {t('courses-cta-title-2')}
      </h2>
      {areCoursesLoading && <Loader/>}
      {
        courseError ?
          <div style={{ textAlign: 'center' }}>
            Nu exista nici un curs!
          </div> :
          <CourseList courses={courses}/>
      }
    </div>
  )
}

export default Courses
