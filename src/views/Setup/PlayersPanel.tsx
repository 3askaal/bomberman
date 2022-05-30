import React, { useState, useEffect, useContext } from 'react'
import { Spacer, Button, Input, Text, ElementGroup } from '3oilerplate'
import { pullAt, some } from 'lodash'
import { X as XIcon, Plus as PlusIcon, Check as CheckIcon } from 'react-feather'
import { CONFIG } from '../../config/config'
import { GameContext, SocketContext } from '../../context'

export const PlayersPanel = () => {
  const { players, setPlayers, settings, getMe, getOpponents }: any = useContext(GameContext)
  const { socket }: any = useContext(SocketContext)
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  const onAddLocalPlayer = () => {
    const playerAmount = CONFIG.AMOUNT_PLAYERS[settings.type]

    if (!currentPlayerName) {
      setError("User field can't be empty")
      return
    }

    if (players.length >= playerAmount.max) {
      setCurrentPlayerName('')
      setError(`Can't add more then ${playerAmount.max} players in ${settings.type} mode.`)
      return
    }

    if (some(players, { name: currentPlayerName })) {
      setCurrentPlayerName('')
      setError('User added already')
      return
    }

    if (settings.type === 'online') {
      socket.emit('update:player', { name: currentPlayerName })
    } else {
      setCurrentPlayerName('')
      setPlayers([ ...players, { name: currentPlayerName } ])
    }
  }

  const onRemoveLocalPlayer = (index: number) => {
    const newLocalPlayers = [ ...players ]
    pullAt(newLocalPlayers, [index])
    setPlayers(newLocalPlayers)
  }

  const onUpdateLocalPlayer = (value: string, index: number) => {
    if (value === '') {
      onRemoveLocalPlayer(index)
    } else {
      const newLocalPlayers = [ ...players ]
      newLocalPlayers[index].name = value
      setPlayers(newLocalPlayers)
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }, [error, currentPlayerName])

  return (
    <Spacer size="xs">
      { settings.type === 'local' && players.map((player: any, index: number) => (
        <ElementGroup key={index}>
          <Input
            s={{ flexGrow: 1 }}
            value={player.name}
            onChange={(value: string) => onUpdateLocalPlayer(value, index)}
            disabled={ player.socketId !== socket.id }
            isPositive={player.me}
          />
          { player.socketId === socket.id && !player.me && (
            <Button onClick={() => onRemoveLocalPlayer(index)}>
              <XIcon />
            </Button>
          )}
        </ElementGroup>
      )) }
      { ((settings.type === 'local' && players.length < CONFIG.AMOUNT_PLAYERS.local.max) || (settings.type === 'online')) && (
        <Spacer size="s">
          <ElementGroup>
            <Input
              placeholder={settings.type === 'local' ? `Player ${players.length + 1}` : 'Pick a username'}
              s={{ flexGrow: 1 }}
              value={currentPlayerName}
              isNegative={error}
              isPositive={getMe()}
              onChange={(value: any) => setCurrentPlayerName(value)}
            />
            <Button type="submit" onClick={onAddLocalPlayer} isReady={getMe()}>
              { settings.type === 'local' ? <PlusIcon /> : <CheckIcon /> }
            </Button>
          </ElementGroup>
          <Text size="s" s={{ color: 'negative' }}>
            {error}
          </Text>
        </Spacer>
      ) }
      { settings.type === 'online' && getOpponents().map((player: any, index: number) => (
        <ElementGroup key={index}>
          <Input
            s={{ flexGrow: 1 }}
            value={player.name}
            onChange={(value: string) => onUpdateLocalPlayer(value, index)}
            disabled={ player.socketId !== socket.id }
            isPositive={player.me}
          />
          { player.socketId === socket.id && !player.me && (
            <Button onClick={() => onRemoveLocalPlayer(index)}>
              <XIcon />
            </Button>
          )}
        </ElementGroup>
      )) }
    </Spacer>
  )
}
