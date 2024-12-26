import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import HackathonProvider from './utility/HackathonProvider'
import AIChatbot from './components/AIChatbot'

ReactDOM.render(
  <React.StrictMode>
    <HackathonProvider>
      <App />
      <AIChatbot />
    </HackathonProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
