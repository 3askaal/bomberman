import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Wrapper, Label, Button, Select, Spacer, ElementGroup, Text } from '3oilerplate'
import { useHistory, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { PlayersPanel } from './PlayersPanel'
import { GameContext, SocketContext } from '../../context'
import { CONFIG } from '../../config/config'
import { Copy } from 'react-feather';
import copy from 'copy-to-clipboard';

const SetupView = () => {
  const history = useHistory()
  const { roomId } = useParams<any>()
  const { room, setRoom, players, onStartGame, settings, setSettings } = useContext(GameContext)
  const { socket, createRoom, joinRoom, startGame }: any = useContext(SocketContext)
  const [activePanel] = useState('players')

  const onLaunch = () => {
    settings.type === 'local' ? onStartGame() : startGame()
  }

  const onOnlineMode = () => {
    socket.connect()

    console.log('onOnlineMode')

    let newRoomId = roomId || uuid().slice(0, 8)

    if (!roomId) {
      history.push(`setup/${newRoomId}`)
    }

    createRoom(newRoomId)
    joinRoom(newRoomId)
  }

  const onLocalMode = () => {
    socket.disconnect()
    setRoom(null)
    history.replace('/setup')
  }

  useEffect(() => {
    if (!roomId && settings.type === 'local') {
      onLocalMode()
    }

    if (settings.type === 'online') {
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
              value={settings.type}
              options={[
                { label: 'Local play', value: 'local' },
                { label: 'Online play', value: 'online' },
              ]}
              onChange={(type: string) => setSettings({ type })}
            />

            { settings.type === 'online' && (
              <ElementGroup s={{ display: 'flex', width: '100%', '> *': { borderRadius: 's' } }}>
                <Label s={{ p: 's', bg: 'backgroundDark', border: 0, justifyContent: 'space-between', flexGrow: 1 }}>
                  <span>{ window.location.href }</span>
                </Label>
                <Button onClick={() => copy(window.location.href)}>
                  <Copy />
                </Button>
              </ElementGroup>
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
