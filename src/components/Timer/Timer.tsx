import React, { useContext } from 'react'
import moment from 'moment'
import { MapContext } from '../../context'

export const Timer = ({ until }: any) => {
  const { remainingTime }: any = useContext(MapContext)

  const getTimeLabel = () => {
    return moment.utc(remainingTime).format('mm:ss')
  }

  return remainingTime ? <div>{ getTimeLabel() }</div> : null
}
