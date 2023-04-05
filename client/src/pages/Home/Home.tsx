import React, {FC, useEffect, useState} from 'react'
import {useTitle} from 'hooks/useTitle'
import HeroSection from 'components/hero/HeroSection'
import image from 'assets/images/home/home-hero.webp'
import CourseList from "../../components/courses/CourseList";
import {Course} from "../../types/course";
import {useFetching} from "../../hooks/useFetching";
import CourseService from "../../services/CourseService";
import {getPageCount} from "../../utils/pages";

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

    useEffect(() => {
        fetchCourses(4, 1)
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
                <CourseList courses={courses} />
            </section>
        </>
    )
}

export default Home
