import React from 'react'
import { Route } from 'wouter'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import {
  Charcuterie,
  Home,
  Faq,
  Sponsors,
  Quicklinks
} from './pages'
import Page from './components/Page'

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Page>
          <Route path='/'><Home /></Route>
          <Route path='/charcuterie'><Charcuterie /></Route>
          <Route path='/faq'><Faq /></Route>
          <Route path='/sponsors'><Sponsors /></Route>
          <Route path='/quicklinks'><Quicklinks /></Route>
        </Page>
      </ThemeProvider>
    </>
  );
}

export default App;
