import React from 'react';
import styled from 'styled-components'
import { Link, useLocation } from 'wouter'
import { A } from './Typography'

const SidebarContainer = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  min-width: 275px;
`;

const Header = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin: 30px;
  margin-left: 60px;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledA = styled(A)`
  display: block;
  font-weight: bold;
  padding: 1em 60px;
  color: ${p => (p.selected ? p.theme.colors.linkHover : p.theme.colors.highlight)};
  ${p => (p.selected && `background: ${p.theme.colors.secondaryBackground};`)}
  &:hover {
    background: ${p => p.theme.colors.secondaryBackground};
  }
  &:focus {
    background: ${p => p.theme.colors.secondaryBackground};
  }
`

export default () => {
  const [location] = useLocation();

  return (
    <SidebarContainer>
      <Header>nwHacks</Header>
      <ItemsContainer>
        <Link href='/'>
          <StyledA selected={location === '/'}>DASHBOARD</StyledA>
        </Link>
        <Link href='/faq'>
          <StyledA selected={location === '/faq'}>FAQ</StyledA>
        </Link>
        <Link href='/sponsors'>
          <StyledA selected={location === '/sponsors'}>SPONSORS</StyledA>
        </Link>
        {
          process.env.NODE_ENV !== 'production' &&
          <Link href='/charcuterie'>
            <StyledA selected={location === '/charcuterie'}>CHARCUTERIE</StyledA>
          </Link>
        }
      </ItemsContainer>
    </SidebarContainer>
  );
}