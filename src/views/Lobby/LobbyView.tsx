import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { some } from 'lodash'
import { Container, Wrapper, Spacer, Button, List, ListItem, Title, Input, ElementGroup } from '3oilerplate'
import { ArrowRight as ArrowRightIcon } from 'react-feather'
import { MapContext, GameContext } from '../../context'
import { CONFIG } from '../../config/config'

const LobbyView = () => {
  const { socket, start, join }: any = useContext(GameContext)
  const { players, setPlayers, settings, setSettings }: any = useContext(MapContext)
  const { roomId }: any = useParams()

  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  useEffect(() => {
    if (socket && roomId) {
      join(roomId)
    }
  }, [socket, roomId, join])

  useEffect(() => {
    setSettings({ type: 'multi' })
  }, [])

  const onAddLocalPlayer = () => {
    const playerAmount = CONFIG.AMOUNT_PLAYERS[settings.type]

    if (!currentPlayerName) {
      setError("User field can't be empty")
      console.log("User field can't be empty")
      return
    }

    if (players.length >= playerAmount.max) {
      setCurrentPlayerName('')
      setError(`Can't add more then ${CONFIG.AMOUNT_PLAYERS[settings.type].max} players in ${settings.type} mode.`)
      console.log(`Can't add more then ${CONFIG.AMOUNT_PLAYERS[settings.type].max} players in ${settings.type} mode.`)
      return
    }

    if (some(players, { name: currentPlayerName })) {
      setCurrentPlayerName('')
      setError('User added already')
      console.log('User added already')
      return
    }

    setCurrentPlayerName('')

    const newPlayers = [ ...players, { name: currentPlayerName } ]
    setPlayers(newPlayers)
    socket.emit('update:players', { roomId, players: newPlayers })
  }

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>
        <Spacer size="m" s={{ flexGrow: 1 }}>
          <ElementGroup>
            <Input
              placeholder="Pick your username"
              value={currentPlayerName}
              onChange={(value: any) => setCurrentPlayerName(value)}
              s={{ flexGrow: 1 }}
            />
            <Button onClick={onAddLocalPlayer}>
              <ArrowRightIcon />
            </Button>
          </ElementGroup>
          <List>
            { players.map((player: any) => (
              <ListItem>
                { player.name }
              </ListItem>
            )) }
          </List>
          <Button onClick={start}>Start Game</Button>
        </Spacer>
      </Container>
    </Wrapper>
  )
}

export default LobbyView
