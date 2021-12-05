import React, { useContext, useEffect, useState } from 'react'
import { SMap, SMapStone, SMapCharacter, SMapBrick, SMapBomb, SMapExplosion, SExplosionCenter, SMapExplosionDirection, SMapExplosionEdge } from './Map.styled'
import { times, sampleSize } from 'lodash'
import { MapContext } from '../../context'

export const Map = ({ style, blocks } : any) => {
  const {
    grid,
    setGrid,
    bombs,
    explosions,
    players
  }: any = useContext(MapContext)

  const getBombs = () => {
    return bombs ? Object.values(bombs).filter(({ bomb }: any) => bomb) : []
  }

  const getExplosions = () => {
    return explosions ? Object.values(explosions).filter(({ explosion }: any) => explosion) : []
  }

  const getStones = () => {
    return grid ? Object.values(grid).filter(({ stone }: any) => stone) : []
  }

  const getBricks = () => {
    return grid ? Object.values(grid).filter(({ brick }: any) => brick) : []
  }

  const getPlayers = () => {
    return players ? Object.values(players) : []
  }

  const getActivePlayers = () => {
    return getPlayers().filter(({ health }: any) => health)
  }

  return (
    <SMap style={{style}} blocks={blocks + 1}>
      { getActivePlayers().map(({x, y, color}: any, index: number) => (
        <SMapCharacter
          key={index}
          s={{
            transform: `translate3d(${x}rem, ${y}rem, 0)`
          }}
          color={color}
        />
      )) }
      { getStones().map(({x, y}: any, index: number) => (
        <SMapStone
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      )) }
      { getBricks().map(({x, y}: any, index: number) => (
        <SMapBrick
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`,
          }}
        />
      )) }
      { getBombs().map(({x, y}: any, index: number) => (
        <SMapBomb
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`,
          }}
        />
      )) }
      { getExplosions().map(({x, y, distance}: any, index: number) => (
        <SMapExplosion key={index} x={x} y ={y}>
          { times(4, (index) => (
            <SExplosionCenter key={index} distance={distance} index={index} />
          )) }
          { Object.keys(distance).map((key: string, index: number) => distance[key] ? (
            <SMapExplosionDirection
              key={index}
              x={x}
              y={y}
              direction={key}
              distance={distance}
            >
              <SMapExplosionEdge
                direction={key}
                {...key === 'right' && distance[key] && { s: {
                  right: 0,
                }}}
                {...key === 'up' && distance[key] && { s: {
                  top: 0,
                }}}
                {...key === 'down' && distance[key] && { s: {
                  bottom: 0,
                }}}
                {...key === 'left' && distance[key] && { s: {
                  left: 0,
                }}}
              />
            </SMapExplosionDirection>
          ) : null) }
        </SMapExplosion>
      ))}
    </SMap>
  )
}
