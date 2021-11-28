import React, { useEffect } from 'react'
import { Box } from '3oilerplate'
import { SControls, SControlsMove, SControlsMiddle, SControlsButton } from './Controls.styled'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Crosshair
} from 'react-feather'
import isMobile from 'is-mobile'

export const Controls = ({ onMove, onAttack, color, index }: any) => {
  useEffect(() => {
    isMobile()
  }, [])

  return (
    <SControls s={{ alignItems: ['flex-start', 'flex-end'][index] }}>
      { index === 0 ? (
        <SControlsButton
          color={color}
          type="attack"
          {...isMobile() ? {
            onTouchStart: () => onAttack()
          } : {
            onMouseDown: () => onAttack()
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
          type="attack"
          {...isMobile() ? {
            onTouchStart: () => onAttack()
          } : {
            onMouseDown: () => onAttack()
          }}
          s={{
            touchAction: isMobile() ? 'auto' : 'none',
          }}
        >
          <Crosshair />
        </SControlsButton>
      ) : null }
    </SControls>
  )
}
