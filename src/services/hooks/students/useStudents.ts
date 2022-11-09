import { useQuery } from 'react-query'

import { formatDate } from '../../../utils/formatDate'
import { api } from '../../axios'
import { Student } from '../../../types/Student'

type GetStudentResponse = {
  totalCount: number
  students: Student[]
}

export async function getStudents(
  page: number
): Promise<GetStudentResponse | undefined> {
  const { data, headers } = await api.get('students', {
    params: {
      page,
    },
  })
  const totalCount = Number(headers['x-total-count'])

  const students = data.students.map((student: Student) => ({
    ...student,
    created_at: formatDate(student.created_at),
  }))

  return { students, totalCount }
}

export function useStudents(page: number) {
  return useQuery(['student', page], () => getStudents(page), {
    staleTime: 1000 * 60 * 10,
  })
}
