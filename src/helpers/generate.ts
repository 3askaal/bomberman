import { times, sampleSize } from 'lodash'

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
