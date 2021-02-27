import React from 'react'
import { A, UL, LI } from './Typography'
import { CardWithHeader } from '../components/Common'

export default ({ title, links }) => {
  return (
    <CardWithHeader header={title}>
      <UL>
        {links.map(link => (
          <LI key={link.label}>
            <A href={link.href}>{link.label}</A>
          </LI>
        ))}
      </UL>
    </CardWithHeader>
  )
}
