import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Button } from '../components/Common'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'
import Quicklinks from '../components/Quicklinks'

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
            key={link.href}
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

export const QuickLinks = () => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    getLinks()
      .then(docs => {
        // Only keep the uncommon links
        return Object.values(docs.reduce((result, doc) => {
          const data = doc.data()
          !data.common && result.push(data)
          return result
        }, []))
      })
      .then(links => {
        //TODO: Group links into categories
        const dummyLinks = [
          {
            category: 'FOO',
            href: 'https://google.com/',
            label: 'foo google 1'
          },
          {
            category: 'FOO',
            href: 'https://google.com/',
            label: 'foogle 2'
          },
          {
            category: 'BAR',
            href: 'https://google.com/',
            label: 'bar gle 3'
          },
          {
            category: 'BAR',
            href: 'https://github.com/',
            label: 'bar GitHub'
          },
          {
            category: 'HELLO',
            href: 'https://github.com/',
            label: 'helloGitHub'
          },
          {
            category: 'WORLD',
            href: 'https://github.com/',
            label: 'worldGitHub'
          }
        ]
        setLinks(dummyLinks);
      })
  }, [setLinks])
  return (
    <Quicklinks links={links} />
  );
}