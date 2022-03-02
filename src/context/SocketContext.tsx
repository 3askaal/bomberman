import React, { createContext, useContext } from 'react'
import { useSocket } from "use-socketio";
import { Socket } from 'socket.io-client';
import { GameContext } from '.';

interface GameContextType {
  socket?: Socket;
  [key: string]: any;
}

export const SocketContext = createContext<GameContextType>({})

export const SocketProvider = ({ children }: any) => {
  const { socket } = useSocket()
  const {
    setPlayers,
    onStartGame,
    onGameBomb,
    onGameMove,
  } = useContext(GameContext)

  useSocket('room:update', ({ players }) => setPlayers(players))
  useSocket('game:start', (args) => onStartGame(args))
  useSocket('game:bomb', (args) => onGameBomb(args))
  useSocket('game:move', (args) => onGameMove(args))

  const joinRoom = (roomId: string) => {
    socket.emit('room:join', { roomId })
  }

  const leaveRoom = (roomId: string) => {
    socket.emit('room:leave', { roomId })
  }

  const createRoom = (roomId: string) => {
    socket.emit('room:create', { roomId })
  }

  const startGame = () => {
    socket.emit('start', {})
  }

  const bomb = (args: any) => {
    console.log(args)
    socket.emit("bomb", args)
  }

  const move = (args: any) => {
    console.log(args)
    socket.emit("move", args)
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        joinRoom,
        leaveRoom,
        createRoom,
        startGame,
        bomb,
        move,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
