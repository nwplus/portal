import React from 'react'
import { A, UL, LI, H2 } from './Typography'
import styled from 'styled-components'
import { Card } from '../components/Common'

const StyledH2 = styled(H2)`
  margin-top: 0.1em;
`

export default ({ title, links }) => {
  return (
    <Card>
      <StyledH2>{title}</StyledH2>
      <UL>
        {links.map(link => (
          <LI key={link.label}>
            <A href={link.href}>{link.label}</A>
          </LI>
        ))}
      </UL>
    </Card>
  )
}
