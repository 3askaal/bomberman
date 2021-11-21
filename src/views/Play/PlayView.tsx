import React, { useContext, useEffect, useState } from 'react'
import { Container, Wrapper, Box } from '3oilerplate'
import randomColor from 'randomcolor'
import { Controls, Map } from '../../components'
import { MapContext } from '../../context'

const initialPlayer = { x: 0, y: 0 }

const PlayView = () => {
  const { events, setEvents }: any = useContext(MapContext)
  const [players, setPlayers] = useState<any[]>([{...initialPlayer}, {...initialPlayer}, {...initialPlayer}, {...initialPlayer}])
  const [blocks] = useState(20)

  const move = (playerIndex: number, direction: string, movement: number) => {
    const newPlayer = { ...players[playerIndex] }

    if (newPlayer[direction] + movement > blocks || newPlayer[direction] + movement < 0) {
      return;
    }

    newPlayer[direction] += movement
    const newPlayers = [...players]
    newPlayers[playerIndex] = { ...players[playerIndex], ...newPlayer }
    setPlayers(newPlayers)
  }

  useEffect(() => {
    const newPlayers = players.map((player: any, index: number) => {
      player.color = randomColor({
        luminosity: 'dark',
      })

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
    <Wrapper>
      <Container style={{ alignItems: 'center' }}>
        <Box
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'space-between',
            flexDirection: 'row',
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          { players.map((player, playerIndex) => (
            <Box
              style={{
                display: 'flex',
                flexBasis: players.length === 2 ? '100%' : '50%',
                alignItems: playerIndex > 1 ? 'flex-end' : null
              }}
            >
              <Controls
                onUpdate={(direction: string, movement: number) => move(playerIndex, direction, movement)}
                color={players[playerIndex].color}
              />
            </Box>
          )) }
        </Box>
        <Box style={{ flexGrow: 1, height: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <Map blocks={blocks} players={players} setPlayers={setPlayers} />
        </Box>
      </Container>
    </Wrapper>
  )
}

export default PlayView
