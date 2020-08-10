import React, { useState, useEffect } from 'react';
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'
import { db } from './utility/firebase'
import { DB_COLLECTION, DB_HACKATHON } from './utility/Constants'

// temp for testing
import { H1, H2, H3, P } from './components/Typography'
import Countdown from './containers/Countdown'

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
        <H1>Live website.</H1>
        <>
          <H1>This is an h1.</H1>
          <H2>This is an h2.</H2>
          <H3>This is an h3.</H3>
          <P>Here's your regular Lorem Ipsum shpeel. It's some really long text. I'm really writing this way later than I should be. Is this what it's like to sell your soul to nwPlus? </P>
          <Countdown countDownDate={new Date("Fri Aug 05 2020 00:01:22 GMT-0700 (Pacific Daylight Time)")} eventDurationHours={48} />
        </>
      </ThemeProvider>
    </>
  );
}

export default App;
