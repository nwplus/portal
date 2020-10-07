import React from 'react';
import { A, UL, LI, H2 } from './Typography';
import { Card } from '../components/Common.js'

// TODO: Create quicklinks card component
export default ({ title, links }) => {
  return (
    <Card>
      <H2>{title}</H2>
      <UL>
        {
          links.map((link) =>
            <LI><A href={link.href}>{link.label}</A></LI>
          )
        }
      </UL>
    </Card>
  );
}