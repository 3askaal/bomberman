import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Box } from '3oilerplate'
import randomColor from 'randomcolor'
import ReactGA from 'react-ga4'
import { sampleSize, times, keyBy } from 'lodash'
import { Controls, Map } from '../../components'
import { MapContext } from '../../context'
import useMousetrap from "react-hook-mousetrap"

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
    blocks,
    players,
    setPlayers,
    move,
    bomb
  }: any = useContext(MapContext)

  useMousetrap('up', () => move(0, 'y', -1))
  useMousetrap('down', () => move(0, 'y', 1))
  useMousetrap('left', () => move(0, 'x', -1))
  useMousetrap('right', () => move(0, 'x', 1))
  useMousetrap('space', () => bomb(0))

  useMousetrap('w', () => move(1, 'y', -1))
  useMousetrap('s', () => move(1, 'y', 1))
  useMousetrap('a', () => move(1, 'x', -1))
  useMousetrap('d', () => move(1, 'x', 1))
  useMousetrap('shift', () => bomb(1))

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/play" });
  }, [])

  const getPlayers = () => {
    return players ? Object.values(players) : []
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
                onBomb={() => bomb(index)}
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
