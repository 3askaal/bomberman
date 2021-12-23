import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { MapContext } from "../context"

export function useKeyboardBindings() {
  const { move, bomb }: any = useContext(MapContext)

  useMousetrap('up', () => move({ playerIndex: 1, direction: 'y', movement: -1 }))
  useMousetrap('down', () => move({ playerIndex: 1, direction: 'y', movement: 1 }))
  useMousetrap('left', () => move({ playerIndex: 1, direction: 'x', movement: -1 }))
  useMousetrap('right', () => move({ playerIndex: 1, direction: 'x', movement: 1 }))
  useMousetrap('space', () => bomb(1))

  useMousetrap('w', () => move({ playerIndex: 0, direction: 'y', movement: -1 }))
  useMousetrap('s', () => move({ playerIndex: 0, direction: 'y', movement: 1 }))
  useMousetrap('a', () => move({ playerIndex: 0, direction: 'x', movement: -1 }))
  useMousetrap('d', () => move({ playerIndex: 0, direction: 'x', movement: 1 }))
  useMousetrap('shift', () => bomb(0))
}
