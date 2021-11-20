import React, { useContext } from 'react'
import { Container, Wrapper, Spacer } from '3oilerplate'
import { RecipeContext } from '../../context'

const HomeView = () => {
  return (
    <Wrapper>
      <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Spacer size="l" style={{ alignItems: 'center' }}>
        </Spacer>
      </Container>
    </Wrapper>
  )
}

export default HomeView
