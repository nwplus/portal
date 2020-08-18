import React, { useState, useEffect } from 'react'
import Announcements from '../components/Announcements'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'

export default () => {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('Announcements')
      .get()
      .then(querySnapshot => {
        setAnnouncements(
          Object.values(querySnapshot.docs.map(doc => doc.data()))
        )
      });
  }, [setAnnouncements])

  return <Announcements announcements={announcements}/>
};