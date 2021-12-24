import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { MapContext } from "../context"

export function useKeyboardBindings() {
  const { move, bomb }: any = useContext(MapContext)

  useMousetrap('up', () => move({ playerIndex: 1, direction: 'y', movement: -1 }, true))
  useMousetrap('down', () => move({ playerIndex: 1, direction: 'y', movement: 1 }, true))
  useMousetrap('left', () => move({ playerIndex: 1, direction: 'x', movement: -1 }, true))
  useMousetrap('right', () => move({ playerIndex: 1, direction: 'x', movement: 1 }, true))
  useMousetrap('space', () => bomb(1, true))

  useMousetrap('w', () => move({ playerIndex: 0, direction: 'y', movement: -1 }, true))
  useMousetrap('s', () => move({ playerIndex: 0, direction: 'y', movement: 1 }, true))
  useMousetrap('a', () => move({ playerIndex: 0, direction: 'x', movement: -1 }, true))
  useMousetrap('d', () => move({ playerIndex: 0, direction: 'x', movement: 1 }, true))
  useMousetrap('shift', () => bomb(0, true))
}
