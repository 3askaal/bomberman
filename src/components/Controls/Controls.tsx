import React, { useState } from 'react'
import { Box } from '3oilerplate'
import { SControls, SControlsButton } from './Controls.styled'
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
      <Box style={{ display: 'flex', flexDirection: 'column' }}>
        <SControlsButton onClick={() => onUpdate('y', -1)}>
          <ChevronUp />
        </SControlsButton>
        <SControlsButton onClick={() => onUpdate('y', 1)}>
          <ChevronDown />
        </SControlsButton>
      </Box>
      <SControlsButton dir="right" onClick={() => onUpdate('x', 1)}>
        <ChevronRight />
      </SControlsButton>
    </SControls>
  )
}
