import React, { useState } from 'react';
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



const Page = ({ children }) => {


  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  return (
    <Container>
      <Sidebar showMobileSidebar={showMobileSidebar} />
      <LeftColumn>
        <MobileMenuBar showMobileSidebar={showMobileSidebar} setShowMobileSidebar={setShowMobileSidebar} />
        <Content>{children}</Content>
      </LeftColumn>
    </Container>
  );
}

export default Page; 