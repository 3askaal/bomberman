import React from 'react'
import { SocketIOProvider } from "use-socketio";
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga4'
import { GlobalStyle, theme } from '3oilerplate'
import { GameProvider } from '../context'
import { HomeView, PlayView } from '../views'
import { LocalGlobalStyle, fonts, colors } from '../style'
import { SApp } from './App.styled'
import './fonts.css'
import SetupView from '../views/Setup/SetupView'
import RoomsView from '../views/Rooms/RoomsView'
import LobbyView from '../views/Lobby/LobbyView'

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
            variants: {
              isBlock: {
                width: '100% !important'
              }
            }
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
        <Router history={history}>
          <SocketIOProvider url="http://localhost:1338">
            <GameProvider>
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
                <Route exact path="/rooms">
                  <RoomsView />
                </Route>
                <Route exact path="/lobby/:roomId">
                  <LobbyView />
                </Route>
              </Switch>
            </GameProvider>
          </SocketIOProvider>
        </Router>
      </SApp>
    </ThemeProvider>
  )
}

export default App
