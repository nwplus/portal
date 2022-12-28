import React from 'react'
import styled from 'styled-components'
import { CardWithHeader } from './Common'
import { useQRCode } from 'next-qrcode'

const QRContainer = styled(CardWithHeader)`
  display: flex;
`

const QRContainerInner = styled.div`
  padding-top: 1rem;
  display: flex;
`

const QrCode = ({ userId }) => {
  const { Canvas } = useQRCode()

  return (
    <QRContainer header="Check-In Code">
      <QRContainerInner>
        <Canvas
          text={userId}
          options={{
            level: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: '#0A1361',
              light: '#5667CF',
            },
          }}
        />
      </QRContainerInner>
    </QRContainer>
  )
}

export default QrCode
