import React, { useContext, useEffect, useState } from 'react'
import { SMap, SMapMetal, SMapCharacter, SMapBrick, SMapBomb } from './Map.styled'
import { times, sampleSize } from 'lodash'
// import * as mt from 'mousetrap'
import { MapContext } from '../../context'

export const Map = ({ players, style, blocks } : any) => {
  const { grid, setGrid }: any = useContext(MapContext)
  // const [grid, setGrid] = useState<any[]>([])
  const [metal, setMetal] = useState<any[]>([])
  const [bricks, setBricks] = useState<any[]>([])
  // const [brickGenerated, setBrickGenerated] = useState<boolean>(false)

  useEffect(() => {
    generate()
  }, [])

  useEffect(() => {
    if (grid && !metal.length) {
      generateMetal()
    }
  }, [grid])

  useEffect(() => {
    if (grid && metal.length && !bricks.length) {
      generateBricks()
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

  function generateMetal() {
    let newGrid = { ...grid }

    const newMetal = Object.values(grid).filter((block: any) => {
      const { x, y } = block

      if (y % 2 && x % 2) {
        newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], metal: true }}
        return true
      }


      return false
    })

    setGrid({...newGrid})
    setMetal(newMetal)
  }

  function generateBricks() {
    let newGrid = { ...grid }

    const freeSpaces = Object.values(grid).filter((block: any) => {
      const { x, y } = block

      const evenUneven = x % 2 === 1 && y % 2 === 0
      const unevenEven = x % 2 === 0 && y % 2 === 1
      const bothUneven = x % 1 === 0 && y % 2 === 0

      if (evenUneven || unevenEven || bothUneven) {
        const isRightRow = y === 0
        const isBottomRow = y === 20
        const isLeftRow = x === 0
        const isTopRow = x === 20
        const firstRow = isRightRow || isBottomRow || isLeftRow || isTopRow

        if (!firstRow) {
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
            left: `${x}rem`,
            top: `${y}rem`
          }}
          color={color}
        />
      )) }
      { metal.length ? metal.map(({x, y}: any, index: number) => (
        <SMapMetal
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`
          }}
        />
      )) : null }
      { bricks.length ? bricks.map(({x, y}: any, index: number) => (
        <SMapBrick
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`,
          }}
        />
      )) : null }
      { grid ? Object.values(grid).filter(({ bomb }: any) => bomb).map(({x, y}: any, index: number) => (
        <SMapBomb
          key={index}
          s={{
            left: `${x}rem`,
            top: `${y}rem`,
          }}
        />
      )) : null }
    </SMap>
  )
}
