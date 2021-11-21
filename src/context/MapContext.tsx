import React, { createContext, useState } from 'react'

export const MapContext = createContext({})

export const MapProvider = ({ children }: any) => {
  const [events, setEvents] = useState<any>({})

  return (
    <MapContext.Provider
      value={{
        events,
        setEvents,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
