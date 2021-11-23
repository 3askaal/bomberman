import React, { useContext, useEffect, useState } from 'react'
import { SMap, SMapStone, SMapCharacter, SMapBrick, SMapBomb } from './Map.styled'
import { times, sampleSize } from 'lodash'
// import * as mt from 'mousetrap'
import { MapContext } from '../../context'

export const Map = ({ players, style, blocks } : any) => {
  const { grid, setGrid, bombs }: any = useContext(MapContext)
  // const [grid, setGrid] = useState<any[]>([])
  const [stones, setStones] = useState<any[]>([])
  const [bricks, setBricks] = useState<any[]>([])
  // const [brickGenerated, setBrickGenerated] = useState<boolean>(false)

  useEffect(() => {
    generate()
  }, [])

  const getBombs = () => {
    return Object.values(bombs).filter(({ bomb }: any) => bomb)
  }

  useEffect(() => {
    console.log(bombs)
  }, [bombs])

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
      { stones.length ? stones.map(({x, y}: any, index: number) => (
        <SMapStone
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
      { getBombs().length ? getBombs().map(({x, y}: any, index: number) => (
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
