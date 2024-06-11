import { createContext, useContext, useState, useEffect } from 'react'
import { DB_HACKATHON_NAMES } from './Constants'

const VALID_HACKATHONS = ['HackCamp', 'nwHacks', 'cmd-f']

function getValidHackathon(hackathon) {
  return VALID_HACKATHONS.includes(hackathon) ? hackathon : 'nwHacks'
}

const HackathonContext = createContext()

export const useHackathon = () => useContext(HackathonContext)

export default function HackathonProvider({ children }) {
  const [activeHackathon, setActiveHackathon] = useState(() => {
    return getValidHackathon(localStorage.getItem('activeHackathon'))
  })
  const [dbHackathonName, setDbHackathonName] = useState(DB_HACKATHON_NAMES[activeHackathon])

  useEffect(() => {
    localStorage.setItem('activeHackathon', activeHackathon)
    setDbHackathonName(DB_HACKATHON_NAMES[activeHackathon])
  }, [activeHackathon])

  return (
    <HackathonContext.Provider value={{ activeHackathon, setActiveHackathon, dbHackathonName }}>
      {children}
    </HackathonContext.Provider>
  )
}
