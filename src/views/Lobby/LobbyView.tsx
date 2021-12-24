import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { some } from 'lodash'
import { Box, Container, Wrapper, Spacer, Button, List, ListItem, Text, Title, Input, ElementGroup } from '3oilerplate'
import { ArrowRight as ArrowRightIcon, Check as CheckIcon } from 'react-feather'
import { MapContext, GameContext } from '../../context'
import { CONFIG } from '../../config/config'

const LobbyView = () => {
  const { socket, start, join }: any = useContext(GameContext)
  const { players, setPlayers, settings, setSettings }: any = useContext(MapContext)
  const { roomId }: any = useParams()
  const [hasJoined, setHasJoined] = useState<boolean>(false)

  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  useEffect(() => {
    if (socket && roomId && !hasJoined) {
      join(roomId)
      setHasJoined(true)
    }
  }, [socket, roomId, hasJoined])

  useEffect(() => {
    setSettings({ type: 'multi' })
  }, [])

  const onPickUsername = () => {
    const playerAmount = CONFIG.AMOUNT_PLAYERS[settings.type]

    if (error) {
      setError('')
    }

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

    if (currentPlayerName.length < 3) {
      setError('Username has to be at least 3 characters long')
      return
    }

    socket.emit('update:player', { roomId, name: currentPlayerName })
  }

  const getOpponents = (): any[] => players.filter(({ socketId }: any) => socketId !== socket.id)
  const getCurrentPlayer = (): any => players.find(({ socketId }: any) => socketId === socket.id)

  const allPlayersHaveUsernames = () => players.every(({ name }: any) => name)
  const rightAmountOfPlayers = () => players.length < CONFIG.AMOUNT_PLAYERS[settings.type]?.min

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
              isNegative={error}
              isPositive={getCurrentPlayer()?.name}
            />
            <Button
              onClick={onPickUsername}
              isPositive={getCurrentPlayer()?.name}
            >
              { !getCurrentPlayer()?.name ? <ArrowRightIcon /> : <CheckIcon /> }
            </Button>
          </ElementGroup>
          { error && (
            <Text size="s" s={{ color: 'negative' }}>
              {error}
            </Text>
          )}
          <Title>vs.</Title>
          <List>
            { getOpponents().map((player: any, index: number) => (
              <ListItem>
                { player.name || `Player ${index + 2}` }
              </ListItem>
            ))}
          </List>
        </Spacer>
        <Box s={{ display: 'flex', width: '100%' }}>
          <Button
            isDisabled={!rightAmountOfPlayers() && !allPlayersHaveUsernames()}
            isBlock
            onClick={start}
          >
            Start Game
          </Button>
        </Box>
      </Container>
    </Wrapper>
  )
}

export default LobbyView
