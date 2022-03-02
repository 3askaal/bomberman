import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Wrapper, Label, Button, Select, Spacer } from '3oilerplate'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { PlayersPanel } from './PlayersPanel'
import { GameContext, SocketContext } from '../../context'
import { CONFIG } from '../../config/config'

const SetupView = () => {
  const history = useHistory()
  const { roomId } = useParams<any>()
  const { setRoom, players, onStartGame, settings, setSettings } = useContext(GameContext)
  const { socket, createRoom, joinRoom, startGame }: any = useContext(SocketContext)
  const [activePanel] = useState('players')

  const onLaunch = () => {
    settings.type === 'local' ? onStartGame() : startGame()
  }

  const onOnlineMode = () => {
    socket.connect()

    let newRoomId = roomId || uuid().slice(0, 8)

    if (!roomId) {
      history.push(`setup/${newRoomId}`)
    }

    setRoom(roomId)
    createRoom(newRoomId)
    joinRoom(newRoomId)
  }

  const onLocalMode = () => {
    socket.disconnect()
    setRoom(null)
    history.replace('/setup')
  }

  useEffect(() => {
    if (settings.type === 'local') {
      onLocalMode()
    } else {
      onOnlineMode()
    }
  }, [settings.type])

  useEffect(() => {
    if (roomId) {
      setSettings({ type: 'online' })
    }
  }, [roomId])

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>
        <Box s={{ display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1 }}>

          <Spacer>
            <Select
              defaultValue={settings.type}
              options={[
                { label: 'Local play', value: 'local' },
                { label: 'Online play', value: 'online' },
              ]}
              onChange={(type: string) => setSettings({ type })}
            />

            { settings.type === 'online' && (
              <Label s={{ p: 's', bg: 'backgroundDark', border: 0 }}>
                { window.location.href }
              </Label>
            )}

          </Spacer>
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
