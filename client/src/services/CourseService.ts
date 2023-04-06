import $api from '../http'
import { AxiosResponse } from 'axios'
import { Course } from '../types/course'

export default class CourseService {
  static fetchCourses(limit = 10, page = 1): Promise<AxiosResponse<Course[]>> {
    return $api.get<Course[]>('/courses', {
      params: {
        limit: limit,
        page: page
      }
    })
  }

  static fetchOneCourse(courseId: string): Promise<AxiosResponse<Course>> {
    return $api.get<Course>(`/courses/${courseId}`)
  }
}
