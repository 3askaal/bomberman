import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Container, Wrapper, Spacer, Button, List, ListItem, Popup, Input } from '3oilerplate'
import { CONFIG } from '../../config/config'
import ReactGA4 from 'react-ga4'
import { GameContext } from '../../context'

const RoomsView = () => {
  const history = useHistory()
  const [rooms, setRooms] = useState<any>([{ id: 1, name: 'Awesome game' }])
  const [newRoomName, setNewRoomName] = useState('')
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false)

  function onJoin(id: number) {
    history.push(`/lobby/${id}`)
  }

  function onCreate() {

  }

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>
        <Spacer size="m" s={{ flexGrow: 1 }}>
          <Button
            onClick={() => setShowCreateRoomModal(true)}
          >
            Create room
          </Button>
          <List>
            { rooms.map((room: any) => (
              <ListItem onClick={() => onJoin(room.id)}>
                {room.id} {room.name}
              </ListItem>
            )) }
          </List>
        </Spacer>
      </Container>
      {showCreateRoomModal && (
        <Popup
          onClose={() => setShowCreateRoomModal(false)}
          actions={[
            <Button onClick={() => onCreate()}>Start</Button>
          ]}
        >
          <Input isBlock value={newRoomName} onChange={(value: string) => setNewRoomName(value)} />
        </Popup>
      )}
    </Wrapper>
  )
}

export default RoomsView
