import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { MapContext } from "../context"

export function useKeyboardBindings() {
  const { move, bomb }: any = useContext(MapContext)

  useMousetrap('up', () => move(1, 'y', -1))
  useMousetrap('down', () => move(1, 'y', 1))
  useMousetrap('left', () => move(1, 'x', -1))
  useMousetrap('right', () => move(1, 'x', 1))
  useMousetrap('space', () => bomb(1))

  useMousetrap('w', () => move(0, 'y', -1))
  useMousetrap('s', () => move(0, 'y', 1))
  useMousetrap('a', () => move(0, 'x', -1))
  useMousetrap('d', () => move(0, 'x', 1))
  useMousetrap('shift', () => bomb(0))
}
