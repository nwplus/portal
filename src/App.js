import React, { useState, useEffect } from 'react';
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import { db } from './utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from './utility/Constants'

// temp for testing
import ProgressBar from './components/ProgressBar'
import TimeDisplay from './components/TimeDisplay'


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
        <TimeDisplay days={1} hours={23} minutes={0} seconds={40}></TimeDisplay>
        <ProgressBar percent={33}></ProgressBar>
      </ThemeProvider>
    </>
  );
}

export default App;
