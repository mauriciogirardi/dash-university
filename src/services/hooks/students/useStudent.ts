import { useQuery } from 'react-query'

import { api } from '../../axios'
import { formatDate } from '../../../utils/formatDate'
import { Student } from '../../../types/Student'

export async function getStudent(studentId: string): Promise<Student> {
  const { data } = await api.get(`students/${studentId}`)

  let student: Student = data.student
  student.due_date = formatDate(student.due_date)
  student.birth = formatDate(student.birth)
  return student
}

export function useStudent(studentId: string) {
  return useQuery('students', () => getStudent(studentId))
}
