import React from 'react'
import { Box, Text, Spacer } from '3oilerplate'
import { SControls, SControlsMove, SControlsMiddle, SControlsButton, SControlsHealth, SControlsHealthProgress } from './Controls.styled'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Crosshair
} from 'react-feather'
import isMobile from 'is-mobile'

export const Controls = ({ onMove, onBomb, name, color, index, health }: any) => {
  return (
    <SControls>
      { index === 0 && (
        <Spacer size="xxs">
          <Box s={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Text>{ name }</Text>
          </Box>
          <SControlsHealth index={index} health={health}>
            <SControlsHealthProgress index={index} health={health} />
          </SControlsHealth>
        </Spacer>
      )}
      <Box s={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: ['flex-start', 'flex-end'][index]
      }}>
        { index === 0 ? (
          <SControlsButton
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
          </SControlsButton>
        ) : null }
        <SControlsMove s={{ alignItems: ['flex-start', 'flex-end'][index] }}>
          <SControlsButton
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
          </SControlsButton>
          <SControlsMiddle>
            <SControlsButton
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
            </SControlsButton>
            <SControlsButton
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
            </SControlsButton>
          </SControlsMiddle>
          <SControlsButton
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
          </SControlsButton>
        </SControlsMove>
        { index === 1 ? (
          <SControlsButton
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
          </SControlsButton>
        ) : null }
      </Box>
      { index === 1 && (
        <Spacer size="xxs">
          <SControlsHealth index={index}>
            <SControlsHealthProgress index={index} health={health} />
          </SControlsHealth>
          <Text>{ name }</Text>
        </Spacer>
      )}
    </SControls>
  )
}
