import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Container, Wrapper, Spacer, Button, List, ListItem } from '3oilerplate'
import { CONFIG } from '../../config/config'
import ReactGA4 from 'react-ga4'
import { GameContext } from '../../context'

const RoomsView = () => {
  const history = useHistory()
  const [rooms, setRooms] = useState<any>([{ id: 1, name: 'Awesome game' }])

  function onJoin(id: number) {
    history.push(`/lobby/${id}`)
  }

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>
        <Spacer size="m" s={{ flexGrow: 1 }}>
          <List>
            { rooms.map((room: any) => (
              <ListItem onClick={() => onJoin(room.id)}>
                {room.id} {room.name}
              </ListItem>
            )) }
          </List>
        </Spacer>
      </Container>
    </Wrapper>
  )
}

export default RoomsView
