import React, {FC} from 'react'
import CourseItem from './CourseItem'
import {Course} from "types/course";

type CoursesProps = {
    courses: Course[]
}

const CourseList: FC<CoursesProps> = ({courses}) => {
    return (
        <div className="courses-grid">
            { courses.map((course: Course, index: number) =>
                <div
                    key={ course.title + index }
                    className="course-item"
                >
                    <CourseItem course={course}/>
                </div>
            ) }

        </div>
    );
};

export default CourseList
