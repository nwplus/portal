import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import HackathonProvider from './utility/HackathonProvider'

ReactDOM.render(
  <React.StrictMode>
    <HackathonProvider>
      <App />
    </HackathonProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
