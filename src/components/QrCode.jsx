import React from 'react'
import styled from 'styled-components'
import { useQRCode } from 'next-qrcode'
// import JsPDF from 'jspdf'
// import html2canvas from 'html2canvas'
import qrcodeBackground from '../assets/hc2024qrcode.svg'
import AppleWalletButtonImage from '../assets/apple_wallet_button.svg'

const QRContainer = styled.div`
  display: flex;
  z-index: 98;
  justify-content: space-around;

  ${p => p.theme.mediaQueries.tabletLarge} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

// const QRContainerInner = styled.div`
//   padding-top: 1rem;
//   display: flex;
// `

const QRTicketContainer = styled.div`
  position: relative;
  width: 442.8px;
  height: 583.2px;
  margin-top: 30px;
`

const QRCodeBackground = styled.img`
  position: absolute;
  width: 442.8px;
  height: 583.2px;
`

const QRCodeDesign = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  left: 50px;
  top: 80px;
  border-radius: 20px;
  z-index: 10;
`

const HackerName = styled.h1`
  color: #2e2e2e;
  font-weight: bold;
  margin-top: 60px;
  position: relative;
  color: ${p => p.theme.colors.cardText};
`

const HackerEmail = styled.p`
  color: #2e2e2e !important;
  font-size: 1.2em;
  margin-top: -10px;
`

const QRTags = styled.div`
  color: #fff;
  display: inline-block;
`

// const SafeWalk = styled.p`
//   background: #e17505;
// `
// const ShirtSize = styled.p`
//   background: #0383fe;
// `
// const Allergies = styled.p`
//   background: #ec4bfc;
// `

// const QRInstructions = styled.p`
//   color: #fff;
//   padding-right: 20px;
// `

// temporary comment out for lint fix
// const SavePDFBtn = styled(Button)`
//   width: 150px;
//   margin: 0 auto;
//   display: block;
// `

const QRInfo = styled.div`
  float: right;
  width: 45%;
  margin-top: 10%;
  padding-left: 20px;

  ${p => p.theme.mediaQueries.mobile} {
    float: none;
    margin-top: 20px;
    width: 100%;
    padding-left: 0px;
  }
`

const QRInfoMobileWelcome = styled.h2`
  display: none;
  ${p => p.theme.mediaQueries.mobile} {
    display: block;
    text-align: center;
  }
`

const QRInfoWelcome = styled.h2`
  padding: 0;
  ${p => p.theme.mediaQueries.mobile} {
    display: none;
  }
`
const QRInfoName = styled.h1`
  padding: 0;
  margin-top: -10px;
  font-size: 40px;
  ${p => p.theme.mediaQueries.mobile} {
    display: none;
  }
`
const QRInfoDes = styled.p``

const AppleWalletButton = styled.button`
  width: 110px;
  height: 35px;
  padding: 10px;
  border: none;
  background-image: url(${AppleWalletButtonImage});
  background-size: auto auto;
  background-color: transparent;
  cursor: pointer;
  margin-top: 30px;
`

// temporary comment out for lint fix
// const generatePDF = () => {
//   // const report = new JsPDF('portrait', 'pt', [300, 500.01])

//   // report.html(document.querySelector('#QRCodeContainer')).then(() => {
//   //   report.addImage(qrcodeBackground, "JPEG", 0, 0, 300, 500);
//   //   report.save('Hackcamp2023QRCode.pdf')
//   // })

//   const input = document.getElementById('QRCodeContainer')
//   html2canvas(input).then(canvas => {
//     const imgData = canvas.toDataURL('img/png')
//     const pdf = new JsPDF('portrait', 'pt', [300, 400])
//     pdf.addImage(imgData, 'PNG', 0, 0, 300, 500)
//     pdf.save('Hackcamp2023QRCode.pdf')
//   })
// }

const QrCode = ({ userInfo, userId }) => {
  const { Canvas } = useQRCode()

  const downloadAppleWalletPass = () => {
    const userId = userInfo.uid
    const name = userInfo.displayName
    const email = userInfo.email
    const url = `https://us-central1-wallet-cloud-func.cloudfunctions.net/getAppleWalletPass?userId=${userId}&name=${name}&email=${email}`
    window.location.href = url
  }

  return (
    <QRContainer>
      <QRInfoMobileWelcome>Welcome, {userInfo.displayName}!</QRInfoMobileWelcome>

      <QRTicketContainer>
        <QRCodeBackground src={qrcodeBackground} />
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
              margin: 2,
              scale: 3,
              width: 180,
              color: {
                dark: '#000000',
                light: '#FFFFFF',
              },
            }}
          />

          <AppleWalletButton onClick={() => downloadAppleWalletPass()} />
        </QRCodeDesign>
      </QRTicketContainer>

      <QRInfo>
        <QRInfoWelcome>Welcome,</QRInfoWelcome>
        <QRInfoName>{userInfo.displayName}!</QRInfoName>
        <QRInfoDes>
          This ticket contains your personal QR code which will be scanned throughout the event.
          Please add this ticket to your mobile wallet or take a screenshot.
        </QRInfoDes>
      </QRInfo>
    </QRContainer>
  )
}

export default QrCode
