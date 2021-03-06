export type AvailableThemes = 'light' | 'dark' | 'unicorn' | 'dracula'

export interface GenericPaletteProps {
  title: string
  navbar: {
    [field: string]: string | number
  }
  body: {
    [field: string]: string | number
  }
  card: {
    [field: string]: string | number
  }
  toast: {
    [field: string]: string | number
  }
}
