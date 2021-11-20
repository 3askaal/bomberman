import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '3oilerplate'
import { RecipeProvider } from '../context'
import { PlayView } from '../views'
import { LocalGlobalStyle, fonts, colors } from '../style'
import { SApp } from './App.styled'
import './fonts.css'

export const history = createBrowserHistory()

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
        <RecipeProvider>
          <Router history={history}>
            <Switch>
              <Route exact path="/">
                <PlayView />
              </Route>
            </Switch>
          </Router>
        </RecipeProvider>
      </SApp>
    </ThemeProvider>
  )
}

export default App
