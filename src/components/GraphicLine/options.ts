import { theme } from '@chakra-ui/react'

export const options: ApexCharts.ApexOptions = {
  chart: {
    type: 'area',
    toolbar: {
      show: false,
    },
    animations: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    offsetX: 0,
    offsetY: -10,
    background: {
      enabled: true,
      foreColor: theme.colors.gray[50],
      padding: 4,
      borderRadius: 1,
      borderWidth: 0,
      borderColor: theme.colors.gray[50],
      opacity: 0.3,
    },
  },
  tooltip: {
    theme: 'dark',
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2022-11-18T00:00:00.000Z',
      '2022-11-19T00:00:00.000Z',
      '2022-11-20T00:00:00.000Z',
      '2022-11-21T00:00:00.000Z',
      '2022-11-22T00:00:00.000Z',
      '2022-11-23T00:00:00.000Z',
    ],
  },
  colors: [theme.colors.green[500], theme.colors.green[400]],
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}
