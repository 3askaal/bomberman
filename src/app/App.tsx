import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga'
import { GlobalStyle, theme } from '3oilerplate'
import { MapProvider } from '../context'
import { PlayView } from '../views'
import { LocalGlobalStyle, fonts, colors } from '../style'
import { SApp } from './App.styled'
import './fonts.css'

export const history = createBrowserHistory()

ReactGA.initialize('119845723')

const App = () => {
  return (
    <ThemeProvider
      theme={{
        ...theme,
        fonts: {
          ...theme.fonts,
          ...fonts,
        },
        colors: {
          ...theme.colors,
          ...colors,
        },
      }}
    >
      <SApp>
        <GlobalStyle />
        <LocalGlobalStyle />
        <MapProvider>
          <Router history={history}>
            <Switch>
              <Route exact path="/">
                <PlayView />
              </Route>
            </Switch>
          </Router>
        </MapProvider>
      </SApp>
    </ThemeProvider>
  )
}

export default App
