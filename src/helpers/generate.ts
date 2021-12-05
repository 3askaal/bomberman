import { times, sampleSize, keyBy } from 'lodash'
import randomColor from 'randomcolor'

export const generatePlayers = (blocks: number) => {
  const colors = ['red', 'green', 'blue', 'purple', 'pink']
  const randomColors = sampleSize(colors, 2)

  const initialPlayers = keyBy(times(2, (index) => ({
    index,
    x: 0,
    y: 0,
    color: randomColor({ luminosity: 'dark', hue: randomColors[index]}),
    health: 100,
  })), 'index')

  const newPlayers = keyBy(Object.values(initialPlayers).map((player: any, index: number) => {

    if (Object.values(initialPlayers).length === 2) {
      if (index === 1) {
        return {
          ...player,
          x: blocks,
          y: blocks
        }
      }
    }

    if (index === 1) {
      return {
        ...player,
        x: blocks,
        y: 0
      }
    }

    if (index === 2) {
      return {
        ...player,
        x: 0,
        y: blocks
      }
    }

    if (index === 3) {
      return {
        ...player,
        x: blocks,
        y: blocks
      }
    }

    return player
  }), 'index')

  return newPlayers
}
export const generateGrid = (blocks: number) => {
    const newGrid: any = {}
    const amountBricksForUnevenCube = (blocks * blocks) + blocks + blocks + 1

    times(amountBricksForUnevenCube, (i) => {
        const y = (i - (i % (blocks + 1))) / (blocks + 1)
        const x = i % (blocks + 1)

        newGrid[`${x}/${y}`] = { x, y }
    })

    return newGrid
}

export const generateStones = (grid: any) => {
    let newGrid = { ...grid }

    Object.values(grid).forEach((block: any) => {
      const { x, y } = block

      if (y % 2 && x % 2) {
        newGrid = { ...newGrid, [`${x}/${y}`]: { ...newGrid[`${x}/${y}`], stone: true }}
        return true
      }

      return false
    })

    return newGrid
}

export const generateBricks = (grid: any, blocks: number) => {
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

    return newGrid
}
