import React, { useState, useEffect, useContext } from 'react'
import { Spacer, Button, Input, Text, ElementGroup } from '3oilerplate'
import { pullAt, some } from 'lodash'
import { X as XIcon, Plus as PlusIcon } from 'react-feather'
import { MapContext } from '../../context'
import { CONFIG } from '../../config/config'

export const PlayersPanel = () => {
  const { players, setPlayers, settings }: any = useContext(MapContext)
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
      setError(`Can't add more then ${CONFIG.AMOUNT_PLAYERS[settings.type].max} players in ${settings.type} mode.`)
      return
    }

    if (some(players, { name: currentPlayerName })) {
      setCurrentPlayerName('')
      setError('User added already')
      return
    }

    setCurrentPlayerName('')
    setPlayers([...players, { name: currentPlayerName }])
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    onAddLocalPlayer()
  }

  const onRemoveLocalPlayer = (index: number) => {
    const newLocalPlayers = [...players]
    pullAt(newLocalPlayers, [index])
    setPlayers(newLocalPlayers)
  }

  const onUpdateLocalPlayer = (value: string, index: number) => {
    if (value === '') {
      onRemoveLocalPlayer(index)
    } else {
      const newLocalPlayers = [...players]
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

  const getPlayers = () => {
    return players
  }

  return (
    <Spacer size="s">
      {getPlayers().map((player: any, index: number) => (
        <Spacer
          key={index.toString()}
          gutter="s"
          s={{ justifyContent: 'center', flexWrap: 'nowrap' }}
        >
          <ElementGroup>
            <Input
              s={{ flexGrow: 1 }}
              value={player.name}
              onChange={(value: string) => onUpdateLocalPlayer(value, index)}
            />
            <Button onClick={() => onRemoveLocalPlayer(index)}>
              <XIcon />
            </Button>
          </ElementGroup>
        </Spacer>
      ))}
      <Spacer size="xs">
        <form onSubmit={onSubmit}>
          <Spacer>
            <ElementGroup>
              <Input
                placeholder="Username"
                s={{ flexGrow: 1 }}
                value={currentPlayerName}
                isNegative={error}
                onChange={(value: any) => setCurrentPlayerName(value)}
              />
              <Button type="submit">
                <PlusIcon />
              </Button>
            </ElementGroup>
          </Spacer>
        </form>
        <Text size="s" s={{ color: 'negative' }}>
          {error}
        </Text>
      </Spacer>
    </Spacer>
  )
}
