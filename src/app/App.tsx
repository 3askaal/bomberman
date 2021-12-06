import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga4'
import { GlobalStyle, theme } from '3oilerplate'
import { MapProvider } from '../context'
import { HomeView, PlayView } from '../views'
import { LocalGlobalStyle, fonts, colors } from '../style'
import { SApp } from './App.styled'
import './fonts.css'
import SetupView from '../views/Setup/SetupView'

export const history = createBrowserHistory()

ReactGA.initialize('G-40XGVJPSNY')

const App = () => {
  return (
    <ThemeProvider
      theme={{
        ...theme,
        rootFontSizes: ['12px', '16px', '20px'],
        fonts: {
          ...theme.fonts,
          ...fonts,
          base: "'Play', sans-serif",
          title: "'Play', sans-serif"
        },
        colors: {
          ...theme.colors,
          ...colors,
        },
        components: {
          Input: {
            default: {
              padding: 'xs',
            },
          },
          Button: {
            default: {
              paddingX: 's',
              paddingY: 'xs',
            },
          },
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
                <HomeView />
              </Route>
              <Route exact path="/setup">
                <SetupView />
              </Route>
              <Route exact path="/play">
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
