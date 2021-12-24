import React from 'react'
import { Box, Text, Spacer } from '3oilerplate'
import { SPlayerDetails, SPlayerDetailsMove, SPlayerDetailsMiddle, SPlayerDetailsButton, SPlayerDetailsHealth, SPlayerDetailsHealthProgress } from './PlayerDetails.styled'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Crosshair
} from 'react-feather'
import isMobile from 'is-mobile'

export const PlayerDetails = ({ onMove, onBomb, name, color, index, health, hasControls }: any) => {
  return (
    <SPlayerDetails>
      { index === 0 && (
        <Spacer size="xxs">
          <Box s={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Text>{ name }</Text>
          </Box>
          <SPlayerDetailsHealth index={index} health={health}>
            <SPlayerDetailsHealthProgress index={index} health={health} />
          </SPlayerDetailsHealth>
        </Spacer>
      )}
      {hasControls && (
        <Box s={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: ['flex-start', 'flex-end'][index]
        }}>
          { index === 0 ? (
            <SPlayerDetailsButton
              color={color}
              type="bomb"
              {...isMobile() ? {
                onTouchStart: () => onBomb()
              } : {
                onMouseDown: () => onBomb()
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <Crosshair />
            </SPlayerDetailsButton>
          ) : null }
          <SPlayerDetailsMove s={{ alignItems: ['flex-start', 'flex-end'][index] }}>
            <SPlayerDetailsButton
              color={color}
              type="left"
              {...isMobile() ? {
                onTouchStart: () => onMove('x',  -1)
              } : {
                onMouseDown: () => onMove('x',  -1)
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <ChevronLeft />
            </SPlayerDetailsButton>
            <SPlayerDetailsMiddle>
              <SPlayerDetailsButton
                color={color}
                type="up"
                {...isMobile() ? {
                  onTouchStart: () => onMove('y',  -1)
                } : {
                  onMouseDown: () => onMove('y',  -1)
                }}
                s={{
                  touchAction: isMobile() ? 'auto' : 'none',
                }}
              >
                <ChevronUp />
              </SPlayerDetailsButton>
              <SPlayerDetailsButton
                color={color}
                type="down"
                {...isMobile() ? {
                  onTouchStart: () => onMove('y', 1)
                } : {
                  onMouseDown: () => onMove('y', 1)
                }}
                s={{
                  touchAction: isMobile() ? 'auto' : 'none',
                }}
              >
                <ChevronDown />
              </SPlayerDetailsButton>
            </SPlayerDetailsMiddle>
            <SPlayerDetailsButton
              color={color}
              type="right"
              {...isMobile() ? {
                onTouchStart: () => onMove('x', 1)
              } : {
                onMouseDown: () => onMove('x', 1)
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <ChevronRight />
            </SPlayerDetailsButton>
          </SPlayerDetailsMove>
          { index === 1 ? (
            <SPlayerDetailsButton
              color={color}
              type="bomb"
              {...isMobile() ? {
                onTouchStart: () => onBomb()
              } : {
                onMouseDown: () => onBomb()
              }}
              s={{
                touchAction: isMobile() ? 'auto' : 'none',
              }}
            >
              <Crosshair />
            </SPlayerDetailsButton>
          ) : null }
        </Box>
      )}
      { index === 1 && (
        <Spacer size="xxs">
          <SPlayerDetailsHealth index={index}>
            <SPlayerDetailsHealthProgress index={index} health={health} />
          </SPlayerDetailsHealth>
          <Text>{ name }</Text>
        </Spacer>
      )}
    </SPlayerDetails>
  )
}
