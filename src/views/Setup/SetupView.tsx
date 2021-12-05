import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Container, Wrapper, Spacer, Button, ElementGroup } from '3oilerplate'
import { PlayersPanel } from './PlayersPanel'
import { MapContext } from '../../context'

const SetupView = () => {
  const history = useHistory()
  const query = useLocation().search;

  const { initialize, settings, setSettings }: any = useContext(MapContext)
  const [activePanel, setActivePanel] = useState('players')

  function onStart() {
    initialize()
    history.push('/play')
  }

  useEffect(() => {
    const type = new URLSearchParams(query).get('type')
    setSettings({ ...settings, type })
  }, [query])

  return (
    <Wrapper s={{ padding: 'l' }}>
      <Container s={{ alignItems: 'center' }}>

        <Spacer size="m" s={{ flexGrow: 1 }}>
          {/* <ElementGroup style={{ width: '100%' }}>
            <Button
              isBlock
              isOutline={activePanel !== 'settings'}
              onClick={() => setActivePanel('settings')}
            >
              Settings
            </Button>
            <Button
              isBlock
              isOutline={activePanel !== 'players'}
              onClick={() => setActivePanel('players')}
            >
              Players
            </Button>
          </ElementGroup> */}

          <Spacer size="s" s={{ flexGrow: 1, justifyContent: 'center' }}>
            {/* {activePanel === 'settings' ? <SettingsPanel /> : null} */}
            {activePanel === 'players' ? <PlayersPanel /> : null}
          </Spacer>
        </Spacer>

        <Button isBlock onClick={onStart}>
          Start
        </Button>

      </Container>
    </Wrapper>
  )
}

export default SetupView
