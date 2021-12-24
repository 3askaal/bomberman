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
  useSocket('bomb', (args) => bomb(args))
  useSocket('move', (args) => move(args))

  function join(roomId: string) {
    console.log(roomId)
    socket.emit('join', { roomId })
  }

  function start() {
    initialize()
    history.push('/play')

    ReactGA4.event({
      category: "actions",
      action: "game:start",
      label: players.map(({ name }: any) => name).join(' vs. '),
    });
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
