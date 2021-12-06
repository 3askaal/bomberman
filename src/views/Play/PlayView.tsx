import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Box, Popup, Button, Text, Spacer } from '3oilerplate'
import ReactGA from 'react-ga4'
import { Controls, Map } from '../../components'
import { MapContext } from '../../context'
import useMousetrap from "react-hook-mousetrap"
import { useHistory } from 'react-router-dom'
import ReactGA4 from 'react-ga4'
import faker from 'faker'
import { Timer } from '../../components/Timer/Timer'

const PlayView = () => {
  const history = useHistory()
  const {
    blocks,
    players,
    setPlayers,
    move,
    bomb,
    initialize,
    remainingTime
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

    if (!players.length) {
      initialize([{ name: faker.name.firstName() }, { name: faker.name.firstName() }])
    }
  }, [])

  useEffect(() => {
    if (getWinner()) {
      ReactGA4.event({
        category: "actions",
        action: "play:win",
        label: getWinner().name
      });
    }
  }, [players])

  const getActivePlayers = (): any[] => {
    return [...players].sort((a: any, b: any) => b.health - a.health).filter(({ health }: any) => health > 0)
  }

  const gameOver = () => getActivePlayers().length === 1 || !remainingTime

  const getWinner = (): any => {
    return getActivePlayers()[0]
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
          { players.map((player: any, index: number) => (
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
                name={player.name}
                index={index}
              />
            </Box>
          )) }
        </Box>
        <Box s={{ flexGrow: 1, height: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <Spacer size="xs">
            <Timer />
            <Map blocks={blocks} players={players} setPlayers={setPlayers} />
          </Spacer>
        </Box>
      </Container>
      { gameOver() && (
        <Popup
          actions={[
            <Button isPositive onClick={() => initialize()}>Restart</Button>
          ]}
        >
          <Text s={{ textAlign: 'center' }}>{
            remainingTime ?
              `${getWinner().name} won!` :
              `Time limit reached!`
          } Click restart to start over!</Text>
        </Popup>
      ) }
    </Wrapper>
  )
}

export default PlayView
