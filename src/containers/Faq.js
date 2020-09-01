import React, { useState, useEffect } from 'react'
import Faq from '../components/Faq'
import { db } from '../utility/firebase'
import { FAQ_COLLECTION, DB_HACKATHON } from '../utility/Constants'

export default () => {
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    const unsubscribe = db
      .collection(FAQ_COLLECTION)
      .where('hackathonIDs', 'array-contains-any', [DB_HACKATHON, 'livesite'])
      .onSnapshot(querySnapshot => {
        setFaqs(
          Object.values(querySnapshot.docs.map(doc => doc.data()))
        )
      });
    return unsubscribe
  }, [setFaqs])

  return faqs.length ? <Faq faq={faqs} /> : null
};