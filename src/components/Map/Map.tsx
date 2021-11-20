import React, { useEffect, useState } from 'react'
import { SMap, SMapBlock, SMapCharacter } from './Map.styled'
import { times } from 'lodash'

export const Map = ({ players, style, blocks } : any) => {
  return (
    <SMap style={{style}} blocks={blocks + 1}>
      { players.map((player: any) => (
        <SMapCharacter
          s={{
            left: `${player.x}rem`,
            top: `${player.y}rem`
          }}
          color={player.color}
        />
      )) }
      { times(blocks * blocks, (i) => {
        const y = (i - (i % blocks)) / blocks
        const x = i % blocks

        return y % 2 && x % 2 ?
          <SMapBlock
            s={{
              left: `${x}rem`,
              top: `${y}rem`
            }}
          /> : null
      })}
    </SMap>
  )
}
