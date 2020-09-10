import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 24px 60px;
  box-sizing: border-box;
  width: 100%;
`;

export default ({ children }) => (
  <Container>
    <Sidebar />
    <Content>{children}</Content>
  </Container>
);