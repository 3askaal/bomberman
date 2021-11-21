import React from 'react'
import { SControls, SControlsMiddle, SControlsButton } from './Controls.styled'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'react-feather'

export const Controls = ({onUpdate, style, color}: any) => {
  return (
    <SControls style={style}>
      <SControlsButton color={color} dir="left" onClick={() => onUpdate('x', -1)}>
        <ChevronLeft />
      </SControlsButton>
      <SControlsMiddle>
        <SControlsButton color={color} dir="up" onClick={() => onUpdate('y', -1)}>
          <ChevronUp />
        </SControlsButton>
        <SControlsButton color={color} dir="down" onClick={() => onUpdate('y', 1)}>
          <ChevronDown />
        </SControlsButton>
      </SControlsMiddle>
      <SControlsButton color={color} dir="right" onClick={() => onUpdate('x', 1)}>
        <ChevronRight />
      </SControlsButton>
    </SControls>
  )
}
