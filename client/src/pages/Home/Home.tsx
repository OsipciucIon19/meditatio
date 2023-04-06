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

const Home: FC = () => {
  const heroData = {
    title: 'Hai să studiem de aici împreună!',
    image: image,
    body: <><p>Platforma ta completă pentru a obține meditații și a studia orele
      preferate.</p>
    <p><i>* Completează câmpul liber de mai jos cu poșta ta electronică pentru a putea urma procedura de
        înregistrare.</i></p></>
  }
  const [courses, setCourses] = useState<Course[]>([])
  const [fetchCourses, areCoursesLoading, courseError] = useFetching(async (limit, page): Promise<void> => {
    const response = await CourseService.fetchCourses(limit, page)

    setCourses([...courses, ...response.data])
  })

  const callToActionList = [
    {
      title: 'Vrei să te alături echipei noastre de profesori?',
      image: teacherImage,
      body: <p>Poți deveni profesor la meditat.io prin completarea unui formular simplu, urmând pe link-ul de mai
        jos</p>,
      inverted: true,
      link: { to: '/become-a-teacher', text: 'Completează formularul' }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      await fetchCourses(3, 1)
    }
    fetchData().catch(console.error)
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
        <h2 className="text-center">Descopera cele mai interesante cursuri!</h2>
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
