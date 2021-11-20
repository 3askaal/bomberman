import React, { useContext, useState } from 'react'
import { Container, Wrapper, Spacer, Box } from '3oilerplate'
import { RecipeContext } from '../../context'
import { Controls, Map } from '../../components'
import { AlignCenter } from 'react-feather'

const initialPlayer = { x: 0, y: 0 }

const PlayView = () => {
  const [players, setPlayers] = useState<any[]>([{...initialPlayer}, {...initialPlayer}, {...initialPlayer}, {...initialPlayer}])

  const move = (playerIndex: number, direction: string, movement: number) => {
    const newPlayer = { ...players[playerIndex] }
    newPlayer[direction] += movement
    const newPlayers = [...players]
    newPlayers[playerIndex] = { ...players[playerIndex], ...newPlayer }
    setPlayers(newPlayers)
  }

  return (
    <Wrapper>
      <Container style={{ alignItems: 'center' }}>
        <Box style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'space-between', flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
          { players.map((player, playerIndex) => (
            <Controls
              style={{
                flexBasis: players.length === 2 ? '100%' : '50%',
                alignItems: playerIndex > 1 ? 'flex-end' : null
              }}
              onUpdate={(direction: string, movement: number) => move(playerIndex, direction, movement)}
            />
          )) }
        </Box>
        <Box style={{ flexGrow: 1, height: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <Map players={players} setPlayers={setPlayers} />
        </Box>
      </Container>
    </Wrapper>
  )
}

export default PlayView
