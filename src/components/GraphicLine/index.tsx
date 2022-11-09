import { Box, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { options } from './options'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface GraphicProps {
  title: string
  series: { name: string; data: number[] }[]
}

export function GraphicLine({ title, series }: GraphicProps) {
  return (
    <Box
      p={['5', '8']}
      pb={['2', '4']}
      bg="gray.800"
      borderRadius={8}
      w="100%"
      overflow="hidden"
    >
      <Text fontSize="lg" mb="4">
        {title}
      </Text>
      <Chart
        type="area"
        height={180}
        key={title}
        width="100%"
        series={series}
        options={options}
      />
    </Box>
  )
}
