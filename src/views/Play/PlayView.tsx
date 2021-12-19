import React, { useContext, useEffect } from 'react'
import { Container, Wrapper, Box, Popup, Button, Text, Spacer } from '3oilerplate'
import ReactGA from 'react-ga4'
import { Controls, Map } from '../../components'
import { MapContext } from '../../context'
import ReactGA4 from 'react-ga4'
import faker from 'faker'
import { Timer } from '../../components/Timer/Timer'
import { useKeyboardBindings } from '../../helpers/keyboard'
import { useSocket } from '../../helpers/socket'

const PlayView = () => {
  const {
    blocks,
    players,
    move,
    bomb,
    initialize,
    remainingTime
  }: any = useContext(MapContext)
  const socket = useSocket('http://127.0.0.1:9080')

  useKeyboardBindings()

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/play" });

    if (!players.length) {
      initialize([{ name: faker.name.firstName() }, { name: faker.name.firstName() }])
    }
  }, [])

  useEffect(() => {
    if (gameOver()) {
      ReactGA4.event({
        category: "actions",
        action: "game:over",
        label: `${players.map(({ name }: any) => name).join(' vs. ')}. ${!remainingTime ? 'Time limit reached.' : `Winner: ${getWinner().name}`}`,
      });
    }
  }, [players])

  const getActivePlayers = (): any[] => {
    return [...players].sort((a: any, b: any) => b.health - a.health).filter(({ health }: any) => health > 0)
  }

  const gameOver = () => getActivePlayers().length === 1 || !remainingTime

  const getWinner = (): any => {
    return gameOver() ? getActivePlayers()[0] : false
  }

  return (
    <Wrapper s={{ padding: ['xs', 'xs', 's'] }}>
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
            <Map blocks={blocks} />
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
