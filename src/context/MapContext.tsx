import React, { createContext, useState } from 'react'

import { generateBricks, generateGrid, generatePlayers, generateStones } from '../helpers/generate'
import { generateDamage } from '../helpers/actions'
import moment from 'moment'

export const MapContext = createContext({})

export const MapProvider = ({ children }: any) => {
  const [blocks] = useState(16)
  const [grid, setGrid] = useState<any>({})
  const [bombs, setBombs] = useState<any>(null)
  const [explosions, setExplosions] = useState<any>(null)
  const [players, setPlayers] = useState<any>([])
  const [settings, setSettings] = useState<any>({})
  const [time, setTime] = useState<number | null>(null)

  const move = (playerIndex: number, direction: string, movement: number) => {
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

  const bomb = (playerIndex: number) => {
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

  const initializePlayers = (initialPlayers: any) => {
    const newPlayers = generatePlayers(initialPlayers || players, blocks)

    setPlayers(newPlayers)
  }

  const initializeGrid = () => {
    let newGrid = generateGrid(blocks)
    newGrid = generateStones(newGrid)
    newGrid = generateBricks(newGrid, blocks)

    setGrid(newGrid)
  }

  const setTimers = () => {
    const endTime = moment().add(3, 'minutes')
    setTime(endTime.valueOf())
  }

  const initialize = (initialPlayers: any) => {
    initializeGrid()
    initializePlayers(initialPlayers)
    setTimers()
  }

  return (
    <MapContext.Provider
      value={{
        blocks,
        grid,
        setGrid,
        bombs,
        setBombs,
        explosions,
        setExplosions,
        players,
        setPlayers,
        move,
        bomb,
        initialize,
        settings,
        setSettings,
        time,
        setTime,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
