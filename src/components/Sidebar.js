import React from 'react';
import styled from 'styled-components';
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

const StyledLink = styled(A)`
  display: block;
  margin: 0.3em 0;
  padding: 0.3em 0;
`

export default () => {
  return (
    <SidebarContainer>
      <Header>Some Title</Header>
      <ItemsContainer>
        <StyledLink>DASHBOARD</StyledLink>
        <StyledLink>FAQ</StyledLink>
        <StyledLink>SPONSORS</StyledLink>
        <StyledLink>SCHEDULE</StyledLink>
      </ItemsContainer>
    </SidebarContainer>
  );
}