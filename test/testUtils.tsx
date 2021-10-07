import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '../src/styles/Global.styled'
const primary = '#8256FF'
const white = '#FFFFFF'

export const DEFAULT_THEME = {
  palette: {
    primary: {
      main: primary,
    },
    secondary: { main: white },
    background: { paper: white },
  },
}

// customize default MUI light theme
const appTheme = createMuiTheme(DEFAULT_THEME)

const AllTheProviders: React.FC = ({ children }) => (
  <MuiThemeProvider theme={appTheme}>
    <ThemeProvider theme={appTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  </MuiThemeProvider>
)

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
