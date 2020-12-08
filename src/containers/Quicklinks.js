import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../components/Input'
import { db } from '../utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from '../utility/Constants'
import Quicklinks from '../components/Quicklinks'

const ButtonContainer = styled.div`
  margin: 1em;
  display: flex;
  justify-content: center;
  ${p => p.theme.mediaQueries.mobile} {
    display: inline-block;
    text-align: center;
    a {
      margin-bottom: 0em;
    }
  }
`

const getCommonLinks = () => {
  return db
    .collection(DB_COLLECTION)
    .doc(DB_HACKATHON)
    .collection('QuickLinks')
    .where('common', '==', true)
    .orderBy('label')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
    })
}

export const CommonLinks = () => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    ;(async () => {
      const commonLinkDocs = await getCommonLinks()
      const commonLinks = commonLinkDocs.map(doc => doc.data())
      setLinks(commonLinks)
    })()
  }, [])

  return (
    <ButtonContainer>
      {links.map(link => (
        <Button key={link.href} href={link.href} rel="noopener noreferrer" target="_blank">
          {link.label}
        </Button>
      ))}
    </ButtonContainer>
  )
}

const getAllLinks = () => {
  return db
    .collection(DB_COLLECTION)
    .doc(DB_HACKATHON)
    .collection('QuickLinks')
    .orderBy('label')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs
    })
}

export const QuickLinks = () => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    getAllLinks()
      .then(docs => {
        // Only keep the uncommon links
        return Object.values(
          docs.reduce((result, doc) => {
            const data = doc.data()
            !data.common && result.push(data)
            return result
          }, [])
        )
      })
      .then(links => {
        setLinks(links)
      })
  }, [setLinks])
  return <Quicklinks links={links} />
}
