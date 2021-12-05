import React, { createContext, useEffect, useState } from 'react'
import { keyBy } from 'lodash'

import { generateBricks, generateGrid, generatePlayers, generateStones } from '../helpers/generate'
import { generateDamage } from '../helpers/actions'

export const MapContext = createContext({})

export const MapProvider = ({ children }: any) => {
  const [blocks] = useState(16)
  const [grid, setGrid] = useState<any>({})
  const [bombs, setBombs] = useState<any>(null)
  const [explosions, setExplosions] = useState<any>(null)
  const [players, setPlayers] = useState<any>(null)

  const move = (playerIndex: number, direction: string, movement: number) => {
    const newPlayer = { ...players[playerIndex] }

    if (newPlayer[direction] + movement > blocks || newPlayer[direction] + movement < 0) {
      return;
    }

    newPlayer[direction] += movement

    const block = Object.values(grid).find(({ x, y, stone, brick }: any) => (x === newPlayer.x && y === newPlayer.y) && (stone || brick))

    if (block) {
      return
    }

    const newPlayers: any = {}
    newPlayers[playerIndex] = { ...players[playerIndex], ...newPlayer }
    setPlayers((currentPlayers: any) => ({ ...currentPlayers, ...newPlayers }))
  }

  const addBomb = (bomb: any) => {
    const resetBomb = { ...bombs }
    setBombs((currentBombs: any) => ({ ...currentBombs, ...bomb }))

    setTimeout(() => {
      setBombs((currentBombs: any) => ({ ...currentBombs, ...resetBomb }))
    }, 3000)
  }

  const bomb = (playerIndex: number) => {
    const { damagePositions, newGrid, resetBomb, explosion, resetExplosion, bomb } = generateDamage(grid, players, playerIndex)

    addBomb(bomb)

    setTimeout(() => {
      setGrid((currentGrid: any) => ({ ...currentGrid, ...newGrid }))
      setBombs((currentBombs: any) => ({ ...currentBombs, ...resetBomb }))

      setPlayers((currentPlayers: any) => {
        const newPlayers = keyBy(
          Object.values(currentPlayers)
            .filter((player: any) => {
              return damagePositions.some(({ x, y }) => player.x === x && player.y === y)
            })
            .map((player: any) => ({
              ...player,
              health: player.health - 20
            })),
          'index'
        )

        return {
          ...currentPlayers,
          ...newPlayers
        }
      })

      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...explosion }))
    }, 3000)

    setTimeout(() => {
      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...resetExplosion }))
    }, 3500)
  }

  const initializePlayers = () => {
    const newPlayers = generatePlayers(blocks)

    setPlayers(newPlayers)
  }

  const initializeGrid = () => {
    let newGrid = generateGrid(blocks)
    newGrid = generateStones(newGrid)
    newGrid = generateBricks(newGrid, blocks)

    setGrid(newGrid)
  }

  const initialize = () => {
    initializeGrid()
    initializePlayers()
  }

  useEffect(() => {
    initialize()
  }, [])

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
        initialize
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
