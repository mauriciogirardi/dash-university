import { SimpleGrid } from '@chakra-ui/react'
import { GraphicLine } from '../components/GraphicLine'

import { DefaultLayout } from '../layout/DefaultLayout'

const seriesWeek = [
  { name: 'Inscrito da semana', data: [31, 120, 18, 85, 99, 184, 25] },
]
const seriesDay = [
  { name: 'Mensalidade', data: [18, 56, 120, 84, 96, 152, 10] },
]

export default function Dashboard() {
  return (
    <DefaultLayout title="Dashboard">
      <SimpleGrid
        flex="1"
        gap="4"
        minChildWidth="320px"
        alignItems="flex-start"
      >
        <GraphicLine title="Inscritos da semana" series={seriesWeek} />
        <GraphicLine title="Mensalidade em dias" series={seriesDay} />
      </SimpleGrid>
    </DefaultLayout>
  )
}
