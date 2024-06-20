import { createContext, useContext, useState, useEffect } from 'react'
import { DB_HACKATHON_NAMES, VALID_HACKATHONS } from './Constants'

const HackathonContext = createContext()

export const useHackathon = function () {
  return useContext(HackathonContext)
}

function getValidHackathon(hackathon) {
  return VALID_HACKATHONS.includes(hackathon) ? hackathon : 'nwhacks'
}

export default function HackathonProvider({ children }) {
  const storedHackathon = localStorage.getItem('activeHackathon')
  const initialHackathon = getValidHackathon(storedHackathon || '')
  const [activeHackathon, setActiveHackathon] = useState(initialHackathon)
  const [dbHackathonName, setDbHackathonName] = useState(DB_HACKATHON_NAMES[initialHackathon])

  useEffect(() => {
    localStorage.setItem('activeHackathon', activeHackathon)
    setDbHackathonName(DB_HACKATHON_NAMES[activeHackathon])

    switch (activeHackathon) {
      case 'hackcamp':
        document.title = 'HackCamp Hacker Portal'
        break
      case 'nwhacks':
        document.title = 'nwHacks Hacker Portal'
        break
      case 'cmd-f':
        document.title = 'cmd-f Hacker Portal'
        break
      default:
        document.title = 'Hacker Portal'
    }
  }, [activeHackathon])

  return (
    <HackathonContext.Provider value={{ activeHackathon, setActiveHackathon, dbHackathonName }}>
      {children}
    </HackathonContext.Provider>
  )
}
