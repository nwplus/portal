import React from 'react';
import styled from 'styled-components'
import { Link, useLocation } from 'wouter'
import { A } from './Typography'

const SidebarContainer = styled.div`
  border-right: 1px solid #aaa;
  min-width: 200px;
  padding: 30px;
`;

const Header = styled.h1`
  font-weight: bold;
  font-size: 32px;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledA = styled(A)`
  display: block;
  margin: 0.3em 0;
  padding: 0.3em 0;
`

export default () => {
  const [location] = useLocation();

  return (
    <SidebarContainer>
      <Header>Some Title</Header>
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
      </ItemsContainer>
    </SidebarContainer>
  );
}