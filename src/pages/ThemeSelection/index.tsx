import { Box } from '@mui/material'
import { PageContainer } from 'components/PageContainer'
import { ThemeList } from './ThemeList'

export function ThemeSelection() {
  return (
    <PageContainer mainText="Personalização" secondaryText="Explore temas incríveis, e deixe a plataforma do seu jeitinho. 🎨">
      <ThemeList />
    </PageContainer>
  )
}
