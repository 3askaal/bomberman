import React, { createContext, useState } from 'react'

export const MapContext = createContext({})

export const MapProvider = ({ children }: any) => {
  const [grid, setGrid] = useState<any>(null)
  const [bombs, setBombs] = useState<any>({})
  const [explosions, setExplosions] = useState<any>({})

  return (
    <MapContext.Provider
      value={{
        grid,
        setGrid,
        bombs,
        setBombs,
        explosions,
        setExplosions
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
