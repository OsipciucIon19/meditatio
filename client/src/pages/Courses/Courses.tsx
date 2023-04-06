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

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [fetchCourses, areCoursesLoading, courseError] = useFetching(async (limit, page): Promise<void> => {
    const response = await CourseService.fetchCourses(limit, page)

    setCourses([...courses, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  const heroData = {
    title: 'Începe să studiezi cursurile tale preferate',
    body: <>
      <p>Fiecare curs poate fi programat prin achiziționarea unui abonament lunar.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.</p>
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
        Alege cursul de care ai nevoie:
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
