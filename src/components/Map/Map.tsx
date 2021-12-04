import React, { useContext, useEffect, useState } from 'react'
import { SMap, SMapStone, SMapCharacter, SMapBrick, SMapBomb, SMapExplosion, SMapExplosionEdge, SExplosionCenter, SMapCenter } from './Map.styled'
import { times, sampleSize } from 'lodash'
import { Box } from '3oilerplate'
// import * as mt from 'mousetrap'
import { MapContext } from '../../context'

export const Map = ({ players, style, blocks } : any) => {
  const { grid, setGrid, bombs, explosions }: any = useContext(MapContext)
  // const [grid, setGrid] = useState<any[]>([])
  const [stones, setStones] = useState<any[]>([])
  const [bricks, setBricks] = useState<any[]>([])
  // const [brickGenerated, setBrickGenerated] = useState<boolean>(false)

  useEffect(() => {
    generate()
  }, [])

  const getBombs = () => {
    return bombs ? Object.values(bombs).filter(({ bomb }: any) => bomb) : []
  }

  const getExplosions = () => {
    return explosions ? Object.values(explosions).filter(({ explosion }: any) => explosion) : []
  }

  const getBricks = () => {
    return grid ? Object.values(grid).filter(({ brick }: any) => brick) : []
  }

  useEffect(() => {
    if (grid) {
      if (!stones.length) {
        generateStones()
      }

      if (stones.length && !bricks.length) {
        generateBricks()
      }

      // const activeBombs = Object.values(grid).filter(({ bomb }: any) => bomb)

      // if (activeBombs.length) {
      //   setBombs([])
      //   setBombs(activeBombs)
      // }
    }
  }, [grid])

  function generate() {
    const newGrid: any = {}
    const amountBricksForUnevenCube = (blocks * blocks) + blocks + blocks + 1

    times(amountBricksForUnevenCube, (i) => {
      const y = (i - (i % (blocks + 1))) / (blocks + 1)
      const x = i % (blocks + 1)

      newGrid[`${x}/${y}`] = { x, y }
    })

    setGrid({...newGrid})
  }

  function generateStones() {
    let newGrid = { ...grid }

    const newStones = Object.values(grid).filter((block: any) => {
      const { x, y } = block

      if (y % 2 && x % 2) {
        newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], stone: true }}
        return true
      }

      return false
    })

    setGrid({...newGrid})
    setStones(newStones)
  }

  function generateBricks() {
    let newGrid = { ...grid }

    const freeSpaces = Object.values(grid).filter((block: any) => {
      const { x, y } = block

      const isEvenUneven = x % 2 === 1 && y % 2 === 0
      const isUnevenEven = x % 2 === 0 && y % 2 === 1
      const isBothUneven = x % 1 === 0 && y % 2 === 0

      if (isEvenUneven || isUnevenEven || isBothUneven) {
        const isTopLeftCorner = y < 3 && x < 3
        const isTopRightCorner = y < 3 && x > (blocks - 3)
        const isBottomLeftCorner = y > (blocks - 3) && x < 3
        const isBottomRightCorner = y > (blocks - 3) && x > (blocks - 3)

        const isCorner = isTopLeftCorner || isTopRightCorner || isBottomLeftCorner || isBottomRightCorner

        if (!isCorner) {
          return true
        }
      }

      return false
    })

    const newBricks = sampleSize(freeSpaces, (60 / 100) * freeSpaces.length)

    newBricks.forEach(({x, y}: any) => {
      newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], brick: true }}
    })

    setGrid({ ...newGrid })
    setBricks(newBricks)
  }

  return (
    <SMap style={{style}} blocks={blocks + 1}>
      { players.map(({x, y, color}: any, index: number) => (
        <SMapCharacter
          key={index}
          s={{
            transform: `translate3d(${x}rem, ${y}rem, 0)`
          }}
          color={color}
        />
      )) }
      { stones.length ? stones.map(({x, y}: any, index: number) => (
        <SMapStone
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      )) : null }
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
        <SMapCenter x={x} y ={y}>
          { times(4, (index) => (
            <SExplosionCenter distance={distance} index={index} />
          )) }
          { Object.keys(distance).map((key: string, index: number) => distance[key] ? (
            <SMapExplosion
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
            </SMapExplosion>
          ) : null) }
        </SMapCenter>
      ))}
    </SMap>
  )
}
