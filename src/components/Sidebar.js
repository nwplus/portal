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
  margin: 30px 0 10px 60px;
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

const LiveDot = styled.span`
  height: 10px;
  width: 10px;
  background-color: ${p => p.theme.colors.text};
  border-radius: 50%;
  margin: 0 7px 0 4px;
  display: inline-block;
`

const LiveLabel = styled.p`
  margin: 1em 0 2em 60px;
  font-weight: 600;
  font-size: .9em;
  border-radius: 7px;
  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.secondaryBackground};
  width: 4em;
  padding: 5px;
`

export default () => {
  const [location] = useLocation();

  return (
    <SidebarContainer>
      <Header>nwHacks</Header>
      <LiveLabel>
        <LiveDot />LIVE
      </LiveLabel>
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