import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Wrapper, Label, Button, Select, Spacer, ElementGroup } from '3oilerplate'
import { useHistory, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { PlayersPanel } from './PlayersPanel'
import { GameContext, SocketContext } from '../../context'
import { CONFIG } from '../../config/config'
import { Copy, Clipboard } from 'react-feather';
import copy from 'copy-to-clipboard';

const SetupView = () => {
  const history = useHistory()
  const { roomId } = useParams<any>()
  const { players, onStartGame, settings, setSettings } = useContext(GameContext)
  const { socket, createRoom, joinRoom, startGame }: any = useContext(SocketContext)
  const [activePanel] = useState('players')
  const [isCopied, setIsCopied] = useState(false)

  const multiPlayerUrl = `${window.location.host}/${roomId || socket.id}`

  const onLaunch = () => {
    settings.type === 'local' ? onStartGame() : startGame()
  }

  const onOnlineMode = () => {
    socket.connect()

    let newRoomId = roomId || uuid().slice(0, 8)

    console.log(roomId)

    if (!roomId) {
      console.log('should not run')
      history.push(`${newRoomId}`)
    }

    createRoom(newRoomId)
    joinRoom(newRoomId)
  }

  const onLocalMode = () => {
    socket.disconnect()
    history.push('/')
  }

  useEffect(() => {
    if (roomId) {
      setSettings({ type: 'online' })
      onOnlineMode()
    } else {
      onLocalMode()
    }
  }, [])

  const onCopy = () => {
    setIsCopied(true)
    copy(multiPlayerUrl)
  }

  const onTypeChange = (type: string) => {
    setSettings({ type })

    if (type === 'local') {
      onLocalMode()
    }

    if (type === 'online') {
      onOnlineMode()
    }
  }

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 1000)
    }
  }, [isCopied])

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
              onChange={onTypeChange}
            />

            { settings.type === 'online' && (
              <ElementGroup s={{ display: 'flex', width: '100%', '> *': { borderRadius: 's' } }}>
                <Label s={{ p: 's', bg: 'backgroundDark', border: 0, justifyContent: 'space-between', flexGrow: 1, overflow: 'scroll' }}>
                  <span>{ multiPlayerUrl }</span>
                </Label>
                <Button onClick={onCopy}>
                  { isCopied ? <Clipboard /> : <Copy/> }
                </Button>
              </ElementGroup>
            )}

          </Spacer>
          <Box s={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            { activePanel === 'players' ? <PlayersPanel /> : null }
          </Box>
        </Box>

        <Button isBlock isDisabled={players && players?.length < CONFIG.AMOUNT_PLAYERS[settings?.type || 'local']?.min} onClick={onLaunch}>
          Start Game
        </Button>

      </Container>
    </Wrapper>
  )
}

export default SetupView
