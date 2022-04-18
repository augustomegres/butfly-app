/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react'
import light from './Light'

type AvailableThemes = 'light' | 'dark' | 'unicorn'

const ThemeContext = createContext({
  theme: 'light',
  muiTheme: light.muiTheme,
  genericPalette: light.themePalette,
  setTheme: (theme: AvailableThemes) => {
    void theme
  },
})
export { ThemeContext }
