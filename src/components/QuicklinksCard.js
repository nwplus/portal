import React from 'react'
import { A, UL, LI, H2 } from './Typography'

import styled from 'styled-components'
import { CardLike } from '../components/Common.js'

const QuicklinksCard = styled.div`
  ${CardLike};
  margin: 0.5em 0;
`

const StyledH2 = styled(H2)`
  margin-top: 0.5em;
`

export default ({ title, links }) => {
  return (
    <QuicklinksCard>
      <StyledH2>{title}</StyledH2>
      <UL>
        {links.map(link => (
          <LI key={link.label}>
            <A href={link.href}>{link.label}</A>
          </LI>
        ))}
      </UL>
    </QuicklinksCard>
  )
}
