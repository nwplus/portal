import React, { useState, useEffect } from 'react'
import Countdown from './Countdown'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'

export default () => {
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('DayOf')
      .where('type', '==', 'hacking')
      .onSnapshot(querySnapshot => {
        const d = querySnapshot.docs[0].data()
        if (d) {
          setStart(new Date(d.startTime))
          setEnd(new Date(d.endTime))
        }
      });
    return unsubscribe
  }, [setStart, setEnd])

  const eventDurationHours = (end.getTime() - start.getTime()) / 1000 / 3600
  const beforeHackingStart = (new Date()).getTime() < start
  const countDownDate = beforeHackingStart ? start : end
  const eventName = beforeHackingStart ? "Hacking starts in..." : "Hacking ends in..."

  return (
    <Countdown
      countDownDate={countDownDate}
      eventName={eventName}
      eventDurationHours={eventDurationHours}
    />
  );
};