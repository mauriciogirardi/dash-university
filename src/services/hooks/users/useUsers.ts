import { useQuery } from 'react-query'

import { formatDate } from '../../../utils/formatDate'
import { User } from '../../../types/User'
import { api } from '../../axios'

type GetUserResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(
  page: number
): Promise<GetUserResponse | undefined> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    },
  })
  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map((user: User) => ({
    ...user,
    created_at: formatDate(user.created_at),
  }))

  return { users, totalCount }
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
  })
}
