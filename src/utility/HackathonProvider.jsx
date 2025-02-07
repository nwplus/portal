import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { DB_HACKATHON_NAMES, VALID_HACKATHONS } from './Constants'

const HackathonContext = createContext()

export const useHackathon = function () {
  return useContext(HackathonContext)
}

function getValidHackathon(hackathon) {
  // TODO: right now this logic fails when we're on a non-hackathon specific page like login
  // so for each hackathon we need to manually change fallback. This shouldn't be necessary ;-;
  return VALID_HACKATHONS.includes(hackathon) ? hackathon : 'cmd-f'
}

export default function HackathonProvider({ children }) {
  const [location] = useLocation()
  const urlHackathon = location.split('/')[2]?.toLowerCase()
  const activeHackathon = getValidHackathon(urlHackathon || '')
  const dbHackathonName = DB_HACKATHON_NAMES[activeHackathon]

  return (
    <HackathonContext.Provider value={{ activeHackathon, dbHackathonName }}>
      {children}
    </HackathonContext.Provider>
  )
}
