import React, { FC, useEffect, useState } from 'react'
import { useTitle } from 'hooks/useTitle'
import HeroSection from 'components/hero/HeroSection'
import image from 'assets/images/home/home-hero.webp'
import teacherImage from 'assets/images/home/teacher-cta.webp'
import CourseList from '../../components/courses/CourseList'
import { Course } from '../../types/course'
import { useFetching } from '../../hooks/useFetching'
import CourseService from '../../services/CourseService'
import Loader from '../../components/ui/Loader/Loader'
import CallToAction from '../../components/cta/CallToAction'
import { useTranslation } from 'react-i18next'

const Home: FC = () => {
  const { t } = useTranslation()
  
  const heroData = {
    title: t('hero-title'),
    image: image,
    body: <><p>{t('main-hero-1-paragraph')}</p>
      <p><i>{t('main-hero-2-paragraph')}</i></p></>
  }
  const [courses, setCourses] = useState<Course[]>([])
  const [fetchCourses, areCoursesLoading, courseError] = useFetching(async (limit, page): Promise<void> => {
    const response = await CourseService.fetchCourses(limit, page)

    setCourses([...courses, ...response.data])
  })

  const callToActionList = [
    {
      title: t('become-a-teacher-cta-title'),
      image: teacherImage,
      body: <p>{t('become-a-teacher-cta-description')}</p>,
      inverted: true,
      link: { to: '/become-a-teacher', text: t('become-a-teacher-cta-button-title') }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      await fetchCourses(3, 1)
    }
    fetchData().catch(console.error)

    return () => {
      setCourses(null)
    }
  }, [])

  useTitle('Pagina Principală')

  return (
    <>
      <HeroSection
        title={heroData.title}
        image={heroData.image}
        body={heroData.body}
        hasForm={true}
      />
      <section>
        <h2 className="text-center">{t('courses-cta-title')}</h2>
        <hr/>
        {areCoursesLoading && <Loader/>}
        {
          courseError ?
            <div style={{ textAlign: 'center' }}>
              Nu exista nici un curs!
            </div> :
            <CourseList courses={courses}/>
        }
        <hr/>
      </section>
      {callToActionList.map(cta =>
        <CallToAction
          key={cta.title.replaceAll(' ', '-')}
          title={cta.title}
          image={cta.image}
          body={cta.body}
          inverted={cta.inverted}
          link={cta.link}
        />
      )}
    </>
  )
}

export default Home
