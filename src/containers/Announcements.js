import React, { useState, useEffect } from 'react'
import Announcements from '../components/Announcements'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON, NP_CACHE_KEY } from '../utility/Constants'

const showNotification = (querySnapshot) => {
  // the data that has been added/removed/updated from db
  const changedDoc = querySnapshot.docChanges()[0]
  const changedAnnouncement = changedDoc.doc.data()

  // check if data was created within 5 secs
  const isDataRecent = new Date() - new Date(changedAnnouncement.timestamp) < 5000
  const isDataAdded = changedDoc.type === 'added'

  if (isDataRecent && isDataAdded && notifPermissionsEnabled()) {
    new Notification(changedAnnouncement.content)
  }
}

const notifPermissionsEnabled = () => {
  const notifPermissionsJSON = localStorage.getItem(NP_CACHE_KEY)
  if (notifPermissionsJSON) {
    const notifPermissions = JSON.parse(notifPermissionsJSON)
    return notifPermissions.enabled === true
  }
  return false
}

export default () => {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('Announcements')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        showNotification(querySnapshot);
        setAnnouncements(
          Object.values(querySnapshot.docs.map(doc => doc.data()))
        )
      });
    return unsubscribe
  }, [setAnnouncements])

  return announcements.length ? <Announcements announcements={announcements} /> : null
};
