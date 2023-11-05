import React from 'react'
import styled from 'styled-components'
import { CardWithHeader } from './Common'
import { useQRCode } from 'next-qrcode'
import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Button } from './Input'
import qrcodeBackground from '../assets/hackcamp2023qrcode.png'

const QRContainer = styled(CardWithHeader)`
  display: flex;
`

const QRContainerInner = styled.div`
  padding-top: 1rem;
  display: flex;
`

const QRCodeDesignContainer = styled.div``

const QRCodeDesign = styled.div`
  width: 300px;
  height: 500px;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding: 45px;
  border-radius: 20px;
  z-index: 10;
  background-image: url(${qrcodeBackground});
  margin: 0 auto;
  display: block;
  margin-top: 30px;
  margin-bottom: -30px;
`

const HackerName = styled.h1`
  color: #fff;
  font-weight: bold;
  margin-top: 60px;
  position: relative;
`

const HackerEmail = styled.p`
  color: #fff;
`

const QRTags = styled.div`
  color: #fff;
  display: inline-block;
`

const SafeWalk = styled.p`
  background: #e17505;
`
const ShirtSize = styled.p`
  background: #0383fe;
`
const Allergies = styled.p`
  background: #ec4bfc;
`

const QRInstructions = styled.p`
  color: #fff;
  padding-right: 20px;
`

const SavePDFBtn = styled(Button)`
  width: 150px;
  margin: 0 auto;
  display: block;
`

const generatePDF = () => {
  // const report = new JsPDF('portrait', 'pt', [300, 500.01])

  // report.html(document.querySelector('#QRCodeContainer')).then(() => {
  //   report.addImage(qrcodeBackground, "JPEG", 0, 0, 300, 500);
  //   report.save('Hackcamp2023QRCode.pdf')
  // })

  const input = document.getElementById('QRCodeContainer')
  html2canvas(input).then(canvas => {
    const imgData = canvas.toDataURL('img/png')
    const pdf = new JsPDF('portrait', 'pt', [300, 400])
    pdf.addImage(imgData, 'PNG', 0, 0, 300, 500)
    pdf.save('Hackcamp2023QRCode.pdf')
  })
}

const QrCode = ({ userInfo, userId }) => {
  const { Canvas } = useQRCode()

  return (
    <QRContainer header="Check-In Code">
      {/*
      <QRContainerInner>
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
        </QRContainerInner> */}

      {/* <button>Save to Google Wallet</button>
      <button>Save to Apple Wallet</button> */}

      <QRCodeDesignContainer>
        <QRCodeDesign id="QRCodeContainer">
          <HackerName>{userInfo.displayName}</HackerName>
          <HackerEmail>{userInfo.email}</HackerEmail>

          <QRTags>
            {/* {userInfo.safewalkNote ? <SafeWalk>SafeWalk: Yes</SafeWalk> : <SafeWalk >SafeWalk: No</SafeWalk>}
            <ShirtSize></ShirtSize>
            <Allergies></Allergies> */}
          </QRTags>

          <Canvas
            text={userId}
            options={{
              level: 'M',
              margin: 1,
              scale: 4,
              width: 120,
              color: {
                dark: '#000000',
                light: '#FFFFFF',
              },
            }}
          />

          <QRInstructions>Please hold onto this QR Code for check-in, meals, etc</QRInstructions>
        </QRCodeDesign>
      </QRCodeDesignContainer>

      <SavePDFBtn color="secondary" onClick={generatePDF}>
        {' '}
        Save as PDF
      </SavePDFBtn>
    </QRContainer>
  )
}

export default QrCode
