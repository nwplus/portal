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
const getLinks = () => {
  return db
    .collection(DB_COLLECTION)
    .doc(DB_HACKATHON)
    .collection('QuickLinks')
    .orderBy('label')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
    });
}

export const CommonLinks = () => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    getLinks()
      .then(docs => {
        // Only keep the common links
        const filtered = Object.values(docs.reduce((result, doc) => {
          const data = doc.data()
          data.common && result.push(data)
          return result
        }, []))
        setLinks(filtered)
      })
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