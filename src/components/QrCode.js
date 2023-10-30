import React from 'react'
import styled from 'styled-components'
import { CardWithHeader } from './Common'
import { useQRCode } from 'next-qrcode'
import JsPDF from 'jspdf'

const QRContainer = styled(CardWithHeader)`
  display: flex;
`

const QRContainerInner = styled.div`
  padding-top: 1rem;
  display: flex;
`

const generatePDF = () => {
  const report = new JsPDF('portrait', 'pt', 'a4')
  report.html(document.querySelector('#QRCodeContainer')).then(() => {
    report.save('Hackcamp2023QRCode.pdf')
  })
}

const QrCode = ({ userId }) => {
  const { Canvas } = useQRCode()

  return (
    <QRContainer header="Check-In Code">
      <QRContainerInner id="QRCodeContainer">
        <Canvas
          text={userId}
          options={{
            level: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          }}
        />
      </QRContainerInner>

      {/* <button onClick={generatePDF}>Save as PDF</button> */}
      {/* <button>Save to Google Wallet</button>
      <button>Save to Apple Wallet</button> */}
    </QRContainer>
  )
}

export default QrCode
