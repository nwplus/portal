import React, { useState, useEffect } from 'react'
import { Route } from 'wouter'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import Home from './pages/Home'
import Charcuterie from './pages/Charcuterie'
import Faq from './pages/Faq'
import Sponsors from './pages/Sponsors'
import { db } from './utility/firebase'
import Page from './components/Page'
import { DB_COLLECTION, DB_HACKATHON } from './utility/Constants'

function App() {
  const [hackathon, setHackathon] = useState()

  // example getting all hackathons data
  useEffect(() => {
    db.collection(DB_COLLECTION).doc(DB_HACKATHON).get().then(doc => {
      const data = doc.data()
      setHackathon(data)
      console.log(data)
    })
  }, [setHackathon])

  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Page>
          <Route path='/'><Home /></Route>
          <Route path='/charcuterie'><Charcuterie /></Route>
          <Route path='/faq'><Faq /></Route>
          <Route path='/sponsors'><Sponsors /></Route>
        </Page>
      </ThemeProvider>
    </>
  );
}

export default App;
