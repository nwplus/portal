import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Button } from '../components/Common'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'

const ButtonContainer = styled.div`
  margin: 1em;
  display: flex;
  justify-content: center;
`

export default () => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    const unsubscribe = db
      .collection(DB_COLLECTION)
      .doc(DB_HACKATHON)
      .collection('QuickLinks')
      .orderBy('label')
      .onSnapshot(querySnapshot => {
        setLinks(
          Object.values(querySnapshot.docs.map(doc => doc.data()))
        )
      });
    return unsubscribe
  }, [setLinks])

  return (
    <ButtonContainer>
      {
        links.map(link => (
          <Button
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.label}
          </Button>
        ))
      }
    </ButtonContainer>
  );
}