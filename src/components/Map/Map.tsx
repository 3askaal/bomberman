import React, { useEffect, useState } from 'react'
import { SMap, SMapBlock, SMapCharacter } from './Map.styled'
import { times } from 'lodash'

export const Map = ({ players, setPlayers, style } : any) => {
  const [blocks, updateBlocks] = useState(20)

  useEffect(() => {
    const newPlayers = players.map((player: any, index: number) => {
      if (players.length === 2) {
        if (index === 1) {
          return {
            x: blocks,
            y: blocks
          }
        }
      }

      if (index === 1) {
        return {
          x: blocks,
          y: 0
        }
      }

      if (index === 2) {
        return {
          x: 0,
          y: blocks
        }
      }

      if (index === 3) {
        return {
          x: blocks,
          y: blocks
        }
      }

      return player
    })

    setPlayers(newPlayers)
  }, [blocks, setPlayers])

  return (
    <SMap style={{style}} blocks={blocks + 1}>
      { players.map((player: any) => (
        <SMapCharacter s={{ left: `${player.x}rem`, top: `${player.y}rem` }} />
      )) }
      { times(blocks * blocks, (i) => {
        const y = (i - (i % blocks)) / blocks
        const x = i % blocks
        return y % 2 && x % 2 ? <SMapBlock s={{ left: `${i % blocks}rem`, top: `${(i - (i % blocks)) / blocks}rem` }} /> : null
      })}
    </SMap>
  )
}
