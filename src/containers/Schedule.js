import React, { useState, useEffect } from 'react'
import Schedule from '../components/Schedule'
import { H1 } from '../components/Typography';
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON, DAYOF_COLLECTION } from '../utility/Constants'

export default () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection(DAYOF_COLLECTION)
      .orderBy('startTime', 'asc')
      .onSnapshot(querySnapshot => {
        setEvents(
          Object.values(querySnapshot.docs.map(doc => doc.data()))
        )
      });
    return unsubscribe
  }, [setEvents])

  return (
    <>
      <H1>Day-Of-Events Schedule</H1>
      <Schedule events={events} />
    </>
  )
};