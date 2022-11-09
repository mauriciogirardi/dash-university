import { useQuery } from 'react-query'

import { api } from '../../axios'
import { Teachers } from '../../../types/Teacher'
import { formatDate } from '../../../utils/formatDate'
import { formatCurrency } from '../../../utils/formatCurrency'

export async function getTeacher(teacherId: string): Promise<Teachers> {
  const { data } = await api.get(`teachers/${teacherId}`)

  let teacher: Teachers = data.teacher

  teacher.due_date = formatDate(teacher.due_date)
  teacher.birth = formatDate(teacher.birth)
  teacher.hiring_date = formatDate(teacher.hiring_date)
  teacher.salary = formatCurrency(teacher.salary)
  return teacher
}

export function useTeacher(teacherId: string) {
  return useQuery('teachers', () => getTeacher(teacherId))
}
