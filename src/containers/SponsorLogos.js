import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'
import Sponsors from '../components/Sponsors';

const CenteredH1 = styled.h2`
  text-align: center;
`


export default () => {
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('Sponsors')
      .onSnapshot(querySnapshot => {
        console.log(querySnapshot.docs.map(doc => doc.data()));
        setSponsors(
          Object.values(querySnapshot.docs.map(doc => doc.data()))
        )
      });
    return unsubscribe
  }, [])

  return (
    <>
      <CenteredH1>A huge thank you to all our sponsors!</CenteredH1>
      <Sponsors sponsors={sponsors} />
    </>
  );
}