import { SpeedDial, SpeedDialAction, Theme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import { IoIosColorPalette } from 'react-icons/io'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes } from './routes'
import { availableThemes } from './themes'
import { ThemeContext } from './themes/ThemeContext'
import { AvailableThemes, GenericPaletteProps } from './themes/types/Theme'
import { Helmet } from 'react-helmet'

export function App() {
  const userTheme = localStorage.getItem('theme') as AvailableThemes
  const [theme, setTheme] = useState<AvailableThemes>(userTheme || 'light')
  const value: {
    theme: string
    muiTheme: Theme
    genericPalette: GenericPaletteProps
    setTheme: (theme: AvailableThemes) => void
  } = {
    theme,
    genericPalette: availableThemes[theme].themePalette,
    muiTheme: availableThemes[theme].muiTheme,
    setTheme
  }

  const colorMode = availableThemes[theme].muiTheme.palette.mode

  const toastTheme = availableThemes[theme].themePalette.toast
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={value.muiTheme}>
        <Helmet>
          <meta name="theme-color" content={`${availableThemes[theme].muiTheme.palette.primary.main}`} />
        </Helmet>
        <ToastContainer limit={3} theme={colorMode} transition={Slide} hideProgressBar={false} toastStyle={{ ...toastTheme }} />
        {/*<SpeedDial
          ariaLabel="theme-selector"
          style={{ position: 'absolute', right: 16, bottom: 16 }}
          FabProps={{ color: 'primary' }}
          icon={<IoIosColorPalette fontSize="22px" />}
        >
          {Object.keys(availableThemes).map(theme => {
            const title = availableThemes[theme].themePalette.title
            const primary = availableThemes[theme].themePalette.navbar.background
            const secondary = availableThemes[theme].themePalette.card.background
            return (
              <SpeedDialAction
                key={theme}
                onClick={() => {
                  localStorage.setItem('theme', theme)
                  setTheme(theme as AvailableThemes)
                }}
                FabProps={{ style: { background: `linear-gradient(135deg, ${primary} 49%, ${secondary} 50%)` } }}
                tooltipTitle={title}
              />
            )
          })}
        </SpeedDial>
        */}
        <Routes />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
