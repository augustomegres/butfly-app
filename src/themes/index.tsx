import { Theme } from '@mui/material'
import dark from './Dark'
import light from './Light'
import { GenericPaletteProps } from './types/Theme'

const availableThemes: {
  [field: string]: { muiTheme: Theme; themePalette: GenericPaletteProps }
} = {
  light,
  dark
}

export { availableThemes }
