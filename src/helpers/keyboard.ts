import React, { useContext } from "react"
import useMousetrap from "react-hook-mousetrap"
import { GameContext } from "../context"

export function useKeyboardBindings() {
  const { settings, getCurrentPlayer, move, bomb } = useContext(GameContext)
  const isLocalGame = settings?.type === 'local'

  useMousetrap('up', () => move({ playerIndex: getCurrentPlayer()?.index || 1, direction: 'y', movement: -1 }, true))
  useMousetrap('down', () => move({ playerIndex: getCurrentPlayer()?.index || 1, direction: 'y', movement: 1 }, true))
  useMousetrap('left', () => move({ playerIndex: getCurrentPlayer()?.index || 1, direction: 'x', movement: -1 }, true))
  useMousetrap('right', () => move({ playerIndex: getCurrentPlayer()?.index || 1, direction: 'x', movement: 1 }, true))
  useMousetrap('space', () => bomb({ playerIndex: getCurrentPlayer()?.index || 1 }, true))

  useMousetrap('w', () => isLocalGame && move({ playerIndex: 0, direction: 'y', movement: -1 }, true))
  useMousetrap('s', () => isLocalGame && move({ playerIndex: 0, direction: 'y', movement: 1 }, true))
  useMousetrap('a', () => isLocalGame && move({ playerIndex: 0, direction: 'x', movement: -1 }, true))
  useMousetrap('d', () => isLocalGame && move({ playerIndex: 0, direction: 'x', movement: 1 }, true))
  useMousetrap('shift', () => isLocalGame && bomb({ playerIndex: 0 }, true))
}
