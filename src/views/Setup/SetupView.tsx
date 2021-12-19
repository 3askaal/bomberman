import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Container, Wrapper, Spacer, Button } from '3oilerplate'
import { PlayersPanel } from './PlayersPanel'
import { MapContext } from '../../context'
import { CONFIG } from '../../config/config'
import ReactGA4 from 'react-ga4'

const SetupView = () => {
  const history = useHistory()
  const query = useLocation().search;

  const { initialize, settings, setSettings, players }: any = useContext(MapContext)
  const [activePanel, setActivePanel] = useState('players')

  function onStart() {
    initialize()
    history.push('/play')

    ReactGA4.event({
      category: "actions",
      action: "game:start",
      label: players.map(({ name }: any) => name).join(' vs. '),
    });
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
            { activePanel === 'players' ? <PlayersPanel /> : null }
          </Spacer>
        </Spacer>

        <Button isBlock isDisabled={players.length < CONFIG.AMOUNT_PLAYERS[settings.type]?.min} onClick={onStart}>
          Start
        </Button>

      </Container>
    </Wrapper>
  )
}

export default SetupView
