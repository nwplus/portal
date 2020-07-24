import React, { useState, useEffect } from 'react';
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import { db } from './utility/firebase'

// temp for testing
import ProgressBar from './components/ProgressBar'
import TimeDisplay from './components/TimeDisplay'


function App() {
  const [hackathons, setHackathons] = useState()

  // example getting all hackathons data
  useEffect(() => {
    db.collection('Hackathons').get().then(querySnapshot => {
      const paths = querySnapshot.docs.map(doc => {
        return doc.data()
      })
      setHackathons(paths)
      console.log(paths)
    })
  }, [setHackathons])

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
