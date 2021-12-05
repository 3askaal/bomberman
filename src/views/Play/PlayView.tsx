import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Box, Popup, Button, Text } from '3oilerplate'
import ReactGA from 'react-ga4'
import { Controls, Map } from '../../components'
import { MapContext } from '../../context'
import useMousetrap from "react-hook-mousetrap"
import { useHistory } from 'react-router-dom'

const PlayView = () => {
  const history = useHistory()
  const {
    blocks,
    players,
    setPlayers,
    move,
    bomb,
    initialize
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

  useEffect(() => {
    if (!players.length) {
      history.push('/')
    }
  }, [])

  const getActivePlayers = (): any[] => {
    return players.filter(({ health }: any) => health)
  }

  const getWinner = (): any => {
    return getActivePlayers()[0] || {}
  }

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
          { getActivePlayers().map((player: any, index: number) => (
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
      { getActivePlayers().length < 2 && (
        <Popup
          actions={[
            <Button isPositive onClick={() => initialize()}>Restart</Button>
          ]}
        >
          <Text s={{ textAlign: 'center' }}>Player { getWinner().index } won! Click restart to start over!</Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
