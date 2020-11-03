import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import MobileMenuBar from './MobileMenuBar';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`;

const LeftColumn = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

const Content = styled.div`
  padding: 24px 60px;
  box-sizing: border-box;
  width: 100%;
`;

const SidebarContainer = styled.div`
  min-height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  @media (max-width: 600px) {
    display: none;
  }
`;

const openSidebar = () => {
  window.alert("hi")
}

export default ({ children }) => (
  <Container>
    <SidebarContainer>
      <Sidebar />
    </SidebarContainer>
    <LeftColumn>
      <MobileMenuBar openSidebar={openSidebar} />
      <Content>{children}</Content>
    </LeftColumn>
  </Container>
);