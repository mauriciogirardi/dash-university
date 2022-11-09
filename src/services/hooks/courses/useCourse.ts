import { useQuery } from 'react-query'

import { api } from '../../axios'
import { Course } from '../../../types/Course'

export async function getCourse(courseId: string): Promise<Course> {
  const { data } = await api.get(`courses/${courseId}`)
  let course: Course = data.course
  return course
}

export function useCourse(courseId: string) {
  return useQuery('course', () => getCourse(courseId))
}
