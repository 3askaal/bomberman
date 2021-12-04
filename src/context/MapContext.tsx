import React, { createContext, useState } from 'react'
import { keyBy } from 'lodash'

export const MapContext = createContext({})

export const MapProvider = ({ children }: any) => {
  const [blocks] = useState(16)
  const [grid, setGrid] = useState<any>(null)
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

  const bomb = (playerIndex: number) => {
    const { x, y }: any = { ...players[playerIndex] }
    const posKey = `${x}/${y}`

    let newGrid = {}

    const bomb = { [posKey]: { x, y, bomb: true } }
    const resetBomb = { [posKey]: { x, y, bomb: false } }

    let explosions: any = { [posKey]: { x, y, explosion: true } }
    let resetExplosions = { [posKey]: { x, y, explosion: false } }

    let damagePositions = [{ x, y }]

    const directions = ['left', 'right', 'up', 'down']

    let distance: any = {
      right: 0,
      left: 0,
      up: 0,
      down: 0
    }

    directions.forEach((direction) => {
      let i = 1
      let limit = 3

      while (i < limit) {
        const go: any = {
          left: `${x - i}/${y}`,
          right: `${x + i}/${y}`,
          up: `${x}/${y - i}`,
          down: `${x}/${y + i}`,
        }

        const newPos = grid[go[direction]]

        if (!newPos || newPos.stone) {
          return
        }

        const newPosKey = `${newPos.x}/${newPos.y}`

        if (newPos.brick) {
          newGrid = { ...newGrid, [newPosKey]: { ...newPos, brick: false }}
        }

        // explosions = { [newPosKey]: { x: newPos.x, y: newPos.y, explosion: true }}
        resetExplosions = { ...resetExplosions, [newPosKey]: { x: newPos.x, y: newPos.y, explosion: false }}

        distance[direction]++

        i++

        if (newPos.brick) {
          limit = i
        }

        damagePositions.push({ x: newPos.x, y: newPos.y })
      }
    })

    explosions = {
      ...explosions,
      // [newPosKey]: { x: newPos.x, y: newPos.y },
      [posKey]: {
        ...explosions[posKey],
        distance,
      }
    }

    setBombs((currentBombs: any) => ({ ...currentBombs, ...bomb }))

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

      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...explosions }))
    }, 3000)

    setTimeout(() => {
      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...resetExplosions }))
    }, 3500)
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
        bomb
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
