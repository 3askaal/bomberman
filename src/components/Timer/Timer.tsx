import React, { useEffect, useContext, useState } from 'react'
import moment from 'moment'
import { getRemainingTime } from '../../helpers/time'
import { MapContext } from '../../context'

export const Timer = ({ until }: any) => {
  const { time }: any = useContext(MapContext)
  const [timeLabel, setTimeLabel] = useState('')

  useEffect(() => {
    if (time) {
      const timerInterval = setInterval(() => {
        if (getRemainingTime(time) > 0) {
          const now = moment().valueOf()
          setTimeLabel(moment.utc(moment(parseFloat(time)).diff(moment(now))).format('mm:ss'))
        } else {
          clearInterval(timerInterval)
        }
      }, 1000)
    }
  }, [time])

  return time ? <span>{timeLabel}</span> : null
}
