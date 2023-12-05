import React, { useState, useEffect } from 'react'
import Schedule from '../components/Schedule/'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON, DAYOF_COLLECTION } from '../utility/Constants'
import { livesiteDocRef } from '../utility/firebase'

export default () => {
  const [events, setEvents] = useState([])
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  useEffect(() => {
    const unsubscribe = livesiteDocRef.onSnapshot(doc => {
      const data = doc.data()
      if (data) {
        setStart(new Date(data.hackathonStart))
        setEnd(new Date(data.hackathonEnd))
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
        setEvents(Object.values(querySnapshot.docs.map(doc => doc.data())))
      })
    return unsubscribe
  }, [setEvents])

  return <Schedule events={events} hackathonStart={start} hackathonEnd={end} />
}
