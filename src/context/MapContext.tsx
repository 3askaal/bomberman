import React, { createContext, useState } from 'react'

export const MapContext = createContext({})

export const MapProvider = ({ children }: any) => {
  const [grid, setGrid] = useState<any>(null)
  const [bombs, setBombs] = useState<any>(null)
  const [explosions, setExplosions] = useState<any>(null)
  const [players, setPlayers] = useState<any>(null)

  return (
    <MapContext.Provider
      value={{
        grid,
        setGrid,
        bombs,
        setBombs,
        explosions,
        setExplosions,
        players,
        setPlayers
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
