import React, { useContext, useEffect, useState } from 'react'
import { Container, Wrapper, Box } from '3oilerplate'
import randomColor from 'randomcolor'
import ReactGA from 'react-ga4'
import { sampleSize, times } from 'lodash'
import { Controls, Map } from '../../components'
import { MapContext } from '../../context'
import useMousetrap from "react-hook-mousetrap"

const colors = ['red', 'green', 'blue', 'purple', 'pink']

const randomColors = sampleSize(colors, 2)

const initialPlayers = times(2, (index) => ({ x: 0, y: 0, color: randomColor({ luminosity: 'dark', hue: randomColors[index]}) }))

const PlayView = () => {
  const {
    grid,
    setGrid,
    setBombs,
    setExplosions
  }: any = useContext(MapContext)
  const [players, setPlayers] = useState<any[]>(initialPlayers)
  const [blocks] = useState(16)

  useMousetrap('up', () => move(0, 'y', -1))
  useMousetrap('down', () => move(0, 'y', 1))
  useMousetrap('left', () => move(0, 'x', -1))
  useMousetrap('right', () => move(0, 'x', 1))
  useMousetrap('space', () => attack(0))

  useMousetrap('w', () => move(1, 'y', -1))
  useMousetrap('s', () => move(1, 'y', 1))
  useMousetrap('a', () => move(1, 'x', -1))
  useMousetrap('d', () => move(1, 'x', 1))
  useMousetrap('shift', () => attack(1))

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/play" });
  }, [])

  function move (playerIndex: number, direction: string, movement: number) {
    const newPlayer = { ...players[playerIndex] }

    if (newPlayer[direction] + movement > blocks || newPlayer[direction] + movement < 0) {
      return;
    }

    newPlayer[direction] += movement

    const block = Object.values(grid).find(({ x, y, stone, brick }: any) => (x === newPlayer.x && y === newPlayer.y) && (stone || brick))

    if (block) {
      return
    }

    const newPlayers = [...players]
    newPlayers[playerIndex] = { ...players[playerIndex], ...newPlayer }
    setPlayers(newPlayers)
  }

  function attack(playerIndex: number) {
    const { x, y }: any = { ...players[playerIndex] }
    const posKey = `${x}/${y}`

    let newGrid = {}

    const bomb = { [posKey]: { x, y, bomb: true } }
    const resetBomb = { [posKey]: { x, y, bomb: false } }

    let explosions: any = { [posKey]: { x, y, explosion: true } }
    let resetExplosions = { [posKey]: { x, y, explosion: false } }

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

        // explosions = { ...explosions, [newPosKey]: { x: newPos.x, y: newPos.y, explosion: true }}
        resetExplosions = { ...resetExplosions, [newPosKey]: { x: newPos.x, y: newPos.y, explosion: false }}

        distance[direction]++

        i++

        if (newPos.brick) {
          limit = i
        }
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
      setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...explosions }))
    }, 3000)

    setTimeout(() => {
      // setExplosions((currentExplosions: any) => ({ ...currentExplosions, ...resetExplosions }))
    }, 3500)
  }

  useEffect(() => {
    const newPlayers = players.map((player: any, index: number) => {

      if (players.length === 2) {
        if (index === 1) {
          return {
            ...player,
            x: blocks,
            y: blocks
          }
        }
      }

      if (index === 1) {
        return {
          ...player,
          x: blocks,
          y: 0
        }
      }

      if (index === 2) {
        return {
          ...player,
          x: 0,
          y: blocks
        }
      }

      if (index === 3) {
        return {
          ...player,
          x: blocks,
          y: blocks
        }
      }

      return player
    })

    setPlayers(newPlayers)
  }, [])

  return (
    <Wrapper s={{ padding: ['xs', 's'] }}>
      <Container s={{ alignItems: 'center' }}>
        <Box
          s={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          { players.map((player, index: number) => (
            <Box
              key={`player${index}`}
              s={{
                display: 'inline-flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Controls
                onMove={(direction: string, movement: number) => move(index, direction, movement)}
                onAttack={() => attack(index)}
                color={player.color}
                index={index}
              />
            </Box>
          )) }
        </Box>
        <Box s={{ flexGrow: 1, height: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <Map blocks={blocks} players={players} setPlayers={setPlayers} />
        </Box>
      </Container>
    </Wrapper>
  )
}

export default PlayView
