import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Wrapper, Spacer, Button, Select } from '3oilerplate'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { PlayersPanel } from './PlayersPanel'
import { GameContext, SocketContext } from '../../context'
import { CONFIG } from '../../config/config'

const SetupView = () => {
  const history = useHistory()
  const location = useLocation()
  const { roomId } = useParams<any>()
  const { room, setRoom, players, onStartGame, settings, setSettings } = useContext(GameContext)
  const { socket, createRoom, joinRoom, startGame }: any = useContext(SocketContext)
  const [activePanel] = useState('players')

  const onLaunch = () => {
    settings.type === 'local' ? onStartGame() : startGame()
  }

  const onOnlineMode = () => {
    socket.connect()

    let newRoomId = roomId || uuid().slice(0, 8)

    console.log(roomId)
    console.log(newRoomId)

    if (!roomId) {
      history.push(`setup/${newRoomId}`)
    }

    setRoom(roomId)
    createRoom(newRoomId)
    joinRoom(newRoomId)

    if (settings.type !== 'online') {
      setSettings({ type: 'online' })
    }
  }

  const onLocalMode = () => {
    socket.disconnect()
    setRoom(null)
    history.replace('/setup')
  }

  useEffect(() => {
    if (settings.type === 'local') {
      onLocalMode()
    } else if (settings.type === 'online' || roomId) {
      onOnlineMode()
    }
  }, [settings.type, roomId])

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>
        <Box s={{ display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1 }}>

          <Select
            value={settings.type}
            options={[
              { label: 'Local play', value: 'local' },
              { label: 'Online play', value: 'online' },
            ]
            // TODO: fix nasty way of setting selected value
            .map((mode) => mode.value === settings.type ? { ...mode, selected: true } : mode)}
            onChange={(type: string) => setSettings({ type })}
          />
          <Box s={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            { activePanel === 'players' ? <PlayersPanel /> : null }
          </Box>
        </Box>


        <Button isBlock isDisabled={players && players?.length < CONFIG.AMOUNT_PLAYERS[settings?.type || 'local']?.min} onClick={onLaunch}>
          Start
        </Button>

      </Container>
    </Wrapper>
  )
}

export default SetupView
