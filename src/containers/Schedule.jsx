import React, { useState, useEffect } from 'react'
import ScheduleC from '../components/Schedule'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON, DAYOF_COLLECTION } from '../utility/Constants'
import { livesiteDocRef } from '../utility/firebase'

const Schedule = () => {
  const [events, setEvents] = useState([])
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  useEffect(() => {
    const unsubscribe = livesiteDocRef.onSnapshot(doc => {
      const d = doc.data()
      if (d) {
        // setStart(new Date(d.hackathonStart))
        // setEnd(new Date(d.hackathonEnd))
        const start = new Date(d.hackathonStart)
        const end = new Date(d.hackathonEnd)
        setStart(start)
        setEnd(end)
      }
    })
    return unsubscribe
  }, [setStart, setEnd])

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection(DAYOF_COLLECTION)
      .orderBy('startTime', 'asc')
      .onSnapshot(querySnapshot => {
        const events = Object.values(querySnapshot.docs.map(doc => doc.data()))
        setEvents(events)
      })
    // .onSnapshot(querySnapshot => {
    //   setEvents(Object.values(querySnapshot.docs.map(doc => doc.data())))
    // })
    return unsubscribe
  }, [setEvents])

  return <ScheduleC events={events} hackathonStart={start} hackathonEnd={end} />
}

export default Schedule
