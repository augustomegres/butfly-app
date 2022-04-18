import { Box, Typography } from '@mui/material'
import { PageContainer } from 'components/PageContainer'
import { Color } from './Color/Color'
import { MoreColors } from './Color/MoreColors'
import { Size } from './Size'
import { ImageSwap } from './ImageSwap'

export function Product() {
  return (
    <PageContainer mainText="Produtos" secondaryText="Aqui você encontra tudo o que precisa para gerenciar seus produtos.">
      <Box sx={{ display: 'flex', p: 4 }}>
        <Box flex={0.5} mr={2}>
          <ImageSwap
            width="100%"
            sx={{ width: '100%', height: 300, maxHeight: 300 }}
            images={[
              'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
              'https://cdn.pixabay.com/photo/2012/11/21/17/02/lion-66898_1280.jpg',
              'https://blog.duogourmet.com.br/wp-content/uploads/2020/01/All_in_burguer.jpg',
              'https://quatrorodas.abril.com.br/wp-content/uploads/2020/12/chevrolet-2021-onix-premier-8389-e1607978189472.jpg?quality=70&strip=info'
            ]}
          />
        </Box>
        <Box flex={0.5} ml={2}>
          <Typography fontSize={26}>Camiseta Polo</Typography>
          <Typography fontSize={18} fontWeight="light">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet maxime odit eveniet quod exercitationem quisquam animi! Voluptas est quos
            blanditiis, voluptate magnam ducimus itaque, necessitatibus, saepe aspernatur placeat deserunt perspiciatis!
          </Typography>

          <Typography fontSize={16} mt={4}>
            Cores disponíveis
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Color />
            <Color />
            <Color />
            <MoreColors />
          </Box>

          <Typography fontSize={16} mt={4}>
            Tamanhos
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Size size="P" />
            <Size size="M" />
            <Size size="G" />
          </Box>
        </Box>
      </Box>
    </PageContainer>
  )
}
