import React from 'react'
import { Button } from '../components/Input'
import { setWhitelist } from '../utility/firebase'

export default () => {
  return (
    <div>
      <Button
        color="secondary"
        width="flex"
        onClick={() => {
          setWhitelist()
        }}
      >
        Add current whitelist
      </Button>
    </div>
  )
}
