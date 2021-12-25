import React, { createContext, useState } from 'react'
import { useSocket } from "use-socketio";
import { useHistory } from 'react-router-dom'
import ReactGA4 from 'react-ga4'
import { useInterval } from '../helpers/interval';
import { generateDamage } from '../helpers/actions';
import { Socket } from 'socket.io-client';
import { IBomb, IExplosion, IGrid, IPlayer, ISettings } from '../types';
import { generateGrid, generatePlayers } from '../helpers/generate';

interface GameContextType {
  blocks?: number;

  grid?: IGrid;
  setGrid?: React.Dispatch<React.SetStateAction<IGrid>>;

  bombs?: IBomb;
  setBombs?: React.Dispatch<React.SetStateAction<IBomb>>;

  explosions?: IExplosion;
  setExplosions?: React.Dispatch<React.SetStateAction<IExplosion>>;

  players?: IPlayer[];
  setPlayers?: React.Dispatch<React.SetStateAction<IPlayer[]>>;

  settings?: ISettings;
  setSettings?: React.Dispatch<React.SetStateAction<ISettings>>;

  remainingTime?: any;

  move?: any;
  bomb?: any;

  rooms?: any;
  createRoom?: any;
  joinRoom?: any;
  leaveRoom?: any;

  launchGame?: any;
  startGame?: any;
  gameActive?: boolean;
  initialize?: any;

  getOpponents?: any;
  getCurrentPlayer?: any;

  socket?: Socket;
}

export const GameContext = createContext<GameContextType>({})

interface MoveActionPayload {
  playerIndex: number;
  direction: 'x' | 'y';
  movement: number;
}

interface BombActionPayload {
  playerIndex: number;
}

export const GameProvider = ({ children }: any) => {
  const history = useHistory()
  const { socket } = useSocket()
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [rooms, setRooms] = useState<any>([])
  const [gameActive, setGameActive] = useState(false)
  const [settings, setSettings] = useState<any>({})
  const [remainingTime, setRemainingTime] = useState<number>(1000)
  const [blocks] = useState(16)
  const [grid, setGrid] = useState<any>({})
  const [bombs, setBombs] = useState<any>(null)
  const [explosions, setExplosions] = useState<any>(null)

  useSocket('rooms:update', (newRooms: any) => {
    setRooms(Object.values(newRooms))
  })

  useSocket('room:update', ({ players: newPlayers }: any) => {
    setPlayers(newPlayers)
  })

  useSocket('game:start', (args) => startGame(args))
  useSocket('game:bomb', (args) => bomb(args))
  useSocket('game:move', (args) => move(args))

  function joinRoom(roomId: string) {
    socket.emit('room:join', { roomId })
  }

  function leaveRoom(roomId: string) {
    socket.emit('room:leave', { roomId })
  }

  const createRoom = (name: string) => {
    socket.emit('room:create', { name })
  }

  const startGame = (args: any) => {
    initialize(args)
    setGameActive(true)
    history.push('/play')

    ReactGA4.event({
      category: "actions",
      action: "game:start",
      label: players.map(({ name }: any) => name).join(' vs. '),
    });
  }

  const launchGame = () => {
    if (settings.type === 'online') {
      socket.emit('start', {})
    }
  }

  const initialize = ({ grid: newGrid, players: newPlayers }: any) => {
    setGrid(newGrid || generateGrid(blocks))
    setPlayers(newPlayers || generatePlayers(players, blocks))
    setTimer()
  }

  const setTimer = () => {
    const minutes = 3
    const remainingTime = minutes * 60 * 1000
    setRemainingTime(remainingTime)
  }

  useInterval(() => {
    setRemainingTime(remainingTime - 1000)
  }, remainingTime ? 1000 : null)

  const getOpponents = (): any[] => players.filter(({ socketId }: any) => socketId !== socket.id)
  const getCurrentPlayer = (): any => players.find(({ socketId }: any) => socketId === socket.id)

  const move = ({ playerIndex, direction, movement }: MoveActionPayload, sendEvent?: boolean) => {
    if (sendEvent) {
      socket.emit("move", { playerIndex, direction, movement })
    }

    const newPlayer = { ...players[playerIndex] }

    newPlayer[direction] += movement

    const positionIsOutOfMap = newPlayer[direction] > blocks || newPlayer[direction] < 0

    if (positionIsOutOfMap) {
      return;
    }

    const positionIsReserved = Object.values(grid)
      .find(({ x, y, stone, brick }: any) =>
        (x === newPlayer.x && y === newPlayer.y) &&
        (stone || brick))

    if (positionIsReserved) {
      return
    }

    setPlayers((currentPlayers: any) => currentPlayers.map((player: any, index: number) => ({
      ...player,
      ...index === playerIndex && {
        x: newPlayer.x,
        y: newPlayer.y,
      }
    })))
  }

  const addBomb = (bomb: any, resetBomb: any) => {
    setBombs((currentBombs: any) => ({ ...currentBombs, ...bomb }))

    setTimeout(() => {
      setBombs((currentBombs: any) => ({ ...currentBombs, ...resetBomb }))
    }, 3000)
  }

  const bomb = ({ playerIndex }: BombActionPayload, sendEvent?: boolean) => {
    if (sendEvent) {
      socket.emit("bomb", { playerIndex })
    }

    const { damagePositions, newGrid, explosion, resetExplosion, bomb, resetBomb } = generateDamage(grid, players, playerIndex)

    addBomb(bomb, resetBomb)

    setTimeout(() => {
      setGrid((currentGrid: any) => ({ ...currentGrid, ...newGrid }))

      setPlayers((currentPlayers: any) => {
        return currentPlayers.map((player: any) => ({
          ...player,
          ...damagePositions.some(({ x, y }) => player.x === x && player.y === y) && ({
            health: player.health - 20
          })
        }))
      })

      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...explosion }))
    }, 3000)

    setTimeout(() => {
      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...resetExplosion }))
    }, 3500)
  }

  return (
    <GameContext.Provider
      value={{
        socket,
        rooms,
        joinRoom,
        createRoom,
        leaveRoom,
        launchGame,
        startGame,
        gameActive,
        players,
        setPlayers,
        settings,
        setSettings,
        initialize,
        remainingTime,
        getOpponents,
        getCurrentPlayer,
        blocks,
        grid,
        setGrid,
        bombs,
        setBombs,
        explosions,
        setExplosions,
        move,
        bomb
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
