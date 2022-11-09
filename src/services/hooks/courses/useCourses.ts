import { useQuery } from 'react-query'

import { formatDate } from '../../../utils/formatDate'
import { api } from '../../axios'
import { Course } from '../../../types/Course'

type GetCourseResponse = {
  totalCount: number
  courses: Course[]
}

export async function getCourses(
  page: number
): Promise<GetCourseResponse | undefined> {
  const { data, headers } = await api.get('courses', {
    params: {
      page,
    },
  })
  const totalCount = Number(headers['x-total-count'])

  const courses = data.courses.map((course: Course) => ({
    ...course,
    created_at: formatDate(course.created_at),
  }))

  return { courses, totalCount }
}

export function useCourses(page: number) {
  return useQuery(['course', page], () => getCourses(page), {
    staleTime: 1000 * 60 * 10,
  })
}
