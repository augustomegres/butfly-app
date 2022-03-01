import React from 'react'
import {
  Chart as ChartJS,
  Tooltip,
  PointElement,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js'
import { useTheme } from '@mui/material'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
)

export function LineChart() {
  const { palette } = useTheme()
  return (
    <Chart
      type="bar"
      data={{
        labels: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
        datasets: [
          {
            type: 'line',
            label: 'Caixa',
            data: [10, 124, 149, 80, 97, 99, 10, 124, 149, 80, 97, 99],
            backgroundColor: palette.warning.main,
            borderColor: palette.warning.main,
          },
          {
            label: 'Entradas',
            data: [33, 53, 85, 41, 44, 65, 10, 124, 149, 80, 97, 99],
            fill: true,
            backgroundColor: palette.success.main,
            borderWidth: 0,
            borderRadius: 5,
          },
          {
            label: 'Saídas',
            data: [-50, -25, -35, -51, -54, -76, -50, -25, -35, -51, -54, -76],
            fill: true,
            backgroundColor: palette.error.main,
            borderWidth: 0,
            borderRadius: 5,
          },
        ],
      }}
      options={{
        elements: {
          line: { tension: 0.4 },
          point: { pointStyle: 'circle', radius: 4, borderWidth: 4 },
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, grid: { display: false } },
        },
      }}
    />
  )
}
