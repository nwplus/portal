import React, { useState, useEffect } from 'react'
import Announcements from '../components/Announcements'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'

export default () => {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('Announcements')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        setAnnouncements(
          Object.values(querySnapshot.docs.map(doc => doc.data()))
        )
      });
    return unsubscribe
  }, [setAnnouncements])

  return announcements.length ? <Announcements announcements={announcements} /> : null
};
