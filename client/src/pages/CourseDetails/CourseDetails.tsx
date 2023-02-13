import React, {FC, useEffect, useState} from 'react'
import {useFetching} from "hooks/useFetching";
import CourseService from "services/CourseService";
import {Course} from "types/course";
import {useParams} from "react-router-dom";
import Loader from "../../components/ui/Loader/Loader";
import NotFoundPage from "../NotFound/NotFoundPage";
import {useTitle} from "../../hooks/useTitle";

const CourseDetails: FC = () => {
    const params = useParams()
    const [course, setCourse] = useState<Course>({
        _id: '',
        category: '',
        content: '',
        description: '',
        imagePath: '',
        price: 0,
        status: '',
        title: ''
    })
    const [fetchCourse, isCourseLoading, courseError] = useFetching(async (id): Promise<void> => {
        const response = await CourseService.fetchOneCourse(id)
        setCourse(response.data)
    })

    useEffect(() => {
        fetchCourse(params.id)
    }, [params.id])

    useTitle(`${course.title}`)
    
    return (
        <div>
            {isCourseLoading ?
                <Loader/> :
                courseError.length ?
                    <NotFoundPage/> :
                    <div>
                        <div>{course.title}</div>
                        <div>{course.price} lei per ora</div>
                    </div>
            }
        </div>
    )
}

export default CourseDetails