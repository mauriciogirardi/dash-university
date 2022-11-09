import { useQuery } from 'react-query'

import { formatDate } from '../../../utils/formatDate'
import { api } from '../../axios'
import { Teachers } from '../../../types/Teacher'

type GetUserResponse = {
  totalCount: number
  teachers: Teachers[]
}

export async function getTeachers(
  page: number
): Promise<GetUserResponse | undefined> {
  const { data, headers } = await api.get('teachers', {
    params: {
      page,
    },
  })
  const totalCount = Number(headers['x-total-count'])

  const teachers = data.teachers.map((teacher: Teachers) => ({
    ...teacher,
    created_at: formatDate(teacher.created_at),
    hiring_date: formatDate(teacher.hiring_date),
    due_date: formatDate(teacher.due_date),
  }))

  return { teachers, totalCount }
}

export function useTeachers(page: number) {
  return useQuery(['teacher', page], () => getTeachers(page), {
    staleTime: 1000 * 60 * 10,
  })
}
