import React, { createContext, useState } from 'react'

export const MapContext = createContext({})

export const MapProvider = ({ children }: any) => {
  const [grid, setGrid] = useState<any>(null)

  return (
    <MapContext.Provider
      value={{
        grid,
        setGrid,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
