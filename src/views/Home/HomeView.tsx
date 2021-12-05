import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Wrapper, Spacer, Button } from '3oilerplate'

const HomeView = () => {
  const history = useHistory()

  return (
    <Wrapper>
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Spacer size="l" style={{ alignItems: 'center' }}>
          <Button onClick={() => history.push('/setup?type=local')}>Local play</Button>
          <Button disable={true} onClick={() => history.push('/multiplayer')}>Multiplayer</Button>
        </Spacer>
      </Container>
    </Wrapper>
  )
}

export default HomeView
