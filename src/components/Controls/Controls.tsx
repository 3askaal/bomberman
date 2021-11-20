import React, { useState } from 'react'
import { Box } from '3oilerplate'
import { SControls, SControlsMiddle, SControlsButton } from './Controls.styled'
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'react-feather'

export const Controls = ({onUpdate, style}: any) => {
  return (
    <SControls style={style}>
      <SControlsButton dir="left" onClick={() => onUpdate('x', -1)}>
        <ChevronLeft />
      </SControlsButton>
      <SControlsMiddle>
        <SControlsButton dir="up" onClick={() => onUpdate('y', -1)}>
          <ChevronUp />
        </SControlsButton>
        <SControlsButton dir="down" onClick={() => onUpdate('y', 1)}>
          <ChevronDown />
        </SControlsButton>
      </SControlsMiddle>
      <SControlsButton dir="right" onClick={() => onUpdate('x', 1)}>
        <ChevronRight />
      </SControlsButton>
    </SControls>
  )
}
