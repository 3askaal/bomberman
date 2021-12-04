import React, { useContext, useEffect, useState } from 'react'
import { Container, Wrapper, Box } from '3oilerplate'
import randomColor from 'randomcolor'
import ReactGA from 'react-ga4'
import { sampleSize, times, keyBy } from 'lodash'
import { Controls, Map } from '../../components'
import { MapContext } from '../../context'
import useMousetrap from "react-hook-mousetrap"
import { PlayCircle } from 'react-feather'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'

const colors = ['red', 'green', 'blue', 'purple', 'pink']

const randomColors = sampleSize(colors, 2)

const initialPlayers = keyBy(times(2, (index) => ({
  index,
  x: 0,
  y: 0,
  color: randomColor({ luminosity: 'dark', hue: randomColors[index]}),
  health: 100,
})), 'index')

const PlayView = () => {
  const {
    grid,
    setGrid,
    setBombs,
    setExplosions,
    players,
    setPlayers
  }: any = useContext(MapContext)

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

  useEffect(() => {
    setPlayers(initialPlayers)
  }, [])

  const getPlayers = () => {
    return players ? Object.values(players) : []
  }

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

    const newPlayers: any = {}
    newPlayers[playerIndex] = { ...players[playerIndex], ...newPlayer }
    setPlayers((currentPlayers: any) => ({ ...currentPlayers, ...newPlayers }))
    console.log(newPlayers[0])
  }

  function attack(playerIndex: number) {
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

      console.log(damagePositions)

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

        console.log('currentPlayers: ', currentPlayers)
        console.log('newPlayers: ', newPlayers)

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

  useEffect(() => {
    const newPlayers = keyBy(Object.values(initialPlayers).map((player: any, index: number) => {

      if (Object.values(initialPlayers).length === 2) {
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
    }), 'index')

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
          { getPlayers().map((player: any, index: number) => (
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
                health={player.health}
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
