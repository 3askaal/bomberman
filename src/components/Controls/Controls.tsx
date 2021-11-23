import React from 'react'
import { Box } from '3oilerplate'
import { SControls, SControlsMiddle, SControlsButton } from './Controls.styled'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Crosshair
} from 'react-feather'

export const Controls = ({ onMove, onAttack, color, index }: any) => {
  return (
    <Box s={{ display: 'inline-flex', flexDirection: 'row', alignItems: ['flex-start', 'flex-end'][index] }}>
      { index === 0 ? (
        <SControlsButton color={color} type="attack" onTouchStart={() => onAttack()} onMouseDown={() => onAttack()}>
          <Crosshair />
        </SControlsButton>
      ) : null }
      <SControls s={{ alignItems: ['flex-start', 'flex-end'][index] }}>
        <SControlsButton color={color} type="left" onTouchStart={() => onMove('x', -1)} onMouseDown={() => onMove('x', -1)}>
          <ChevronLeft />
        </SControlsButton>
        <SControlsMiddle>
          <SControlsButton color={color} type="up" onTouchStart={() => onMove('y', -1)} onMouseDown={() => onMove('y', -1)}>
            <ChevronUp />
          </SControlsButton>
          <SControlsButton color={color} type="down" onTouchStart={() => onMove('y', 1)} onMouseDown={() => onMove('y', 1)}>
            <ChevronDown />
          </SControlsButton>
        </SControlsMiddle>
        <SControlsButton color={color} type="right" onTouchStart={() => onMove('x', 1)} onMouseDown={() => onMove('x', 1)}>
          <ChevronRight />
        </SControlsButton>
      </SControls>
      { index === 1 ? (
        <SControlsButton color={color} type="attack" onTouchStart={() => onAttack()} onMouseDown={() => onAttack()}>
          <Crosshair />
        </SControlsButton>
      ) : null }
    </Box>
  )
}
