import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { DB_HACKATHON_NAMES, VALID_HACKATHONS } from './Constants'

const HackathonContext = createContext()

export const useHackathon = function () {
  return useContext(HackathonContext)
}

function getValidHackathon(hackathon) {
  return VALID_HACKATHONS.includes(hackathon) ? hackathon : 'nwhacks'
}

export default function HackathonProvider({ children }) {
  const [location] = useLocation()
  const urlHackathon = location.split('/')[2]?.toLowerCase()
  const [activeHackathon, setActiveHackathon] = useState(getValidHackathon(urlHackathon || ''))
  const dbHackathonName = DB_HACKATHON_NAMES[activeHackathon]

  useEffect(() => {
    const newHackathon = getValidHackathon(urlHackathon || '')
    setActiveHackathon(newHackathon)
  }, [location])

  return (
    <HackathonContext.Provider value={{ activeHackathon, setActiveHackathon, dbHackathonName }}>
      {children}
    </HackathonContext.Provider>
  )
}
