import React from 'react'
import { SocketIOProvider } from "use-socketio";
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga4'
import { GlobalStyle, theme } from '3oilerplate'
import { GameProvider, SocketProvider } from '../context'
import { HomeView, PlayView, SetupView } from '../views'
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
              borderWidth: '2px',
            },
            variants: {
              isReady: {
                backgroundColor: 'transparent',
                color: 'positive',
                borderColor: 'positive',

                ':hover': {
                  backgroundColor: 'positive',
                  color: 'background',
                  borderColor: 'positive',
                }
              }
            }
          },
        },
      }}
    >
      <SApp>
        <GlobalStyle />
        <LocalGlobalStyle />
        <Router history={history}>
          <SocketIOProvider url={SOCKET_URL} opts={{ autoConnect: false }}>
            <Switch>
              <Route exact path="/">
                <HomeView />
              </Route>
              <GameProvider>
                <SocketProvider>
                  <Route exact path="/setup/:roomId?">
                    <SetupView />
                  </Route>
                  <Route exact path="/play/:roomId?">
                    <PlayView />
                  </Route>
                </SocketProvider>
              </GameProvider>
            </Switch>
          </SocketIOProvider>
        </Router>
      </SApp>
    </ThemeProvider>
  )
}

export default App
