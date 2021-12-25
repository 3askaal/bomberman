import React from 'react'
import { SocketIOProvider } from "use-socketio";
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga4'
import { GlobalStyle, theme } from '3oilerplate'
import { GameProvider } from '../context'
import { HomeView, PlayView, SetupView, RoomsView, LobbyView } from '../views'
import { LocalGlobalStyle, fonts, colors } from '../style'
import { SApp } from './App.styled'
import './fonts.css'
import { SOCKET_URL } from '../constants';

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
          <SocketIOProvider url={SOCKET_URL}>
            <GameProvider>
              <Switch>
                <Route exact path="/">
                  <HomeView />
                </Route>
                <Route exact path="/setup">
                  <SetupView />
                </Route>
                <Route exact path="/rooms">
                  <RoomsView />
                </Route>
                <Route exact path="/rooms/:roomId">
                  <LobbyView />
                </Route>
                <Route exact path="/play/:roomId?">
                  <PlayView />
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
