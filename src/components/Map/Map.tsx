import React, { useContext, useEffect, useState } from 'react'
import { SMap, SMapBlock, SMapCharacter } from './Map.styled'
import { times } from 'lodash'
import { MapContext } from '../../context'

export const Map = ({ players, style, blocks } : any) => {
  const { events, setEvents }: any = useContext(MapContext)
  const [grid, setGrid] = useState<any[]>([])

  useEffect(() => {
    const newGrid: any[] = []
    let newEvents: any = {}

    times(blocks * blocks, (i) => {
      const y = (i - (i % blocks)) / blocks
      const x = i % blocks

      if (y % 2 && x % 2) {
        newEvents[`${x}x${y}`] = false
        newGrid.push({ x, y })
        setGrid(newGrid)
        setEvents(newEvents)
      }
    })
  }, [])

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
      { grid.map(({x, y}) => (
        <SMapBlock
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      ))}
    </SMap>
  )
}
