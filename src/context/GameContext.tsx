import React, { createContext, useContext, useEffect } from 'react'
import { useSocket } from "use-socketio";
import { MapContext } from '.'
import { useHistory } from 'react-router-dom'
import ReactGA4 from 'react-ga4'

export const GameContext = createContext({})

export const GameProvider = ({ children }: any) => {
  const history = useHistory()
  const { initialize, move, bomb, players, setPlayers }: any = useContext(MapContext)
  const { socket } = useSocket()

  useSocket('update:players', (newPlayers: any) => setPlayers(newPlayers))

  useSocket('start', (args) => onStart(args))
  useSocket('bomb', (args) => onBomb(args))
  useSocket('move', (args) => onMove(args))


  function join(roomId: string) {
    socket.emit('join', { roomId })
  }

  function start() {
    socket.emit('start', {})

    ReactGA4.event({
      category: "actions",
      action: "game:start",
      label: players.map(({ name }: any) => name).join(' vs. '),
    });
  }

  function onStart(args: any) {
    history.push('/play')
    initialize(args)
  }

  function onBomb(args: any) {
    bomb(args, false)
  }

  function onMove(args: any) {
    move(args, false)
  }


  return (
    <GameContext.Provider
      value={{
        socket,
        join,
        start,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
