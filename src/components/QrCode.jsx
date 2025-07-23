import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useQRCode } from 'next-qrcode'
import html2canvas from 'html2canvas'
import hcQrBackground from '../assets/hc2024qrcode.svg'
import nwHacksQrBackground from '../assets/nwhacks2025qrcode.svg'
import cmdfQrBackground from '../assets/cmdf2025qrcode.svg'
import AppleWalletButtonImage from '../assets/apple_wallet_button.svg'
import { useHackathon } from '../utility/HackathonProvider'

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
  background-image: url(${props => props.backgroundImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${p => p.theme.mediaQueries.mobile} {
    width: 354.24px;
    height: 464.4px;
  }
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

  ${p =>
    p.hackathon === 'nwhacks' &&
    `
    left: 60px;
    top: 50px;
  `}

  ${p => p.theme.mediaQueries.mobile} {
    left: 40px;
    top: 40px;
  }
`

const HackerName = styled.h1`
  color: #2e2e2e;
  font-weight: bold;
  margin-top: 60px;
  position: relative;
  color: ${p => p.theme.colors.qrCodeText};

  ${p => p.theme.mediaQueries.mobile} {
    font-size: 1.5em;
  }
`

const HackerEmail = styled.p`
  font-size: 1.2em;
  margin-top: -10px;
  color: ${p => p.theme.colors.qrCodeText};

  ${p => p.theme.mediaQueries.mobile} {
    font-size: 1em;
  }
`

const QR = styled.div`
  ${p =>
    p.hackathon === 'nwhacks' &&
    `
    margin-top: 20px;
  `}

  ${p => p.theme.mediaQueries.mobile} {
    canvas {
      max-width: 150px;
      max-height: 150px;
    }
  }
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

const DownloadButton = styled.button`
  background: ${p => p.theme.colors.primary};
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${p => p.theme.colors.primaryHover || p.theme.colors.primary};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${p => p.theme.mediaQueries.mobile} {
    width: 100%;
    justify-content: center;
    font-size: 18px;
    padding: 16px 24px;
  }
`

const SaveMessage = styled.div`
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;

  &.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  &.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
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
  const { activeHackathon } = useHackathon()
  const baseUrl = window.location.origin
  const qrTicketRef = useRef(null)

  const [isDownloading, setIsDownloading] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const backgrounds = {
    'hackcamp': hcQrBackground,
    'nwhacks': nwHacksQrBackground,
    'cmd-f': cmdfQrBackground,
  }

  const qrcodeBackground = backgrounds[activeHackathon] || nwHacksQrBackground

  // Device detection
  const isMobile = () => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform))
    )
  }

  const generateFilename = () => {
    const hackathonNames = {
      'hackcamp': 'HackCamp',
      'nwhacks': 'nwHacks',
      'cmd-f': 'cmd-f',
    }
    const hackathonName = hackathonNames[activeHackathon] || 'Event'
    const userName = userInfo.displayName.replace(/[^a-zA-Z0-9]/g, '_')
    return `${hackathonName}_QR_${userName}.png`
  }

  const showMessage = (message, type) => {
    setSaveMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setSaveMessage('')
      setMessageType('')
    }, 3000)
  }

  // Save QR ticket (works for both desktop and mobile)
  const saveQRTicket = async () => {
    if (isDownloading) return

    setIsDownloading(true)

    try {
      const element = qrTicketRef.current
      if (!element) {
        throw new Error('QR ticket element not found')
      }
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        scale: 1,
      })

      canvas.toBlob(
        async blob => {
          if (!blob) {
            throw new Error('Failed to generate image')
          }

          const filename = generateFilename()

          if (isMobile() && navigator.share && navigator.canShare) {
            try {
              const file = new File([blob], filename, { type: 'image/png' })
              if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                  files: [file],
                  title: 'My QR Ticket',
                  text: 'My event QR ticket',
                })
                showMessage('QR ticket shared successfully!', 'success')
                return
              }
            } catch (shareError) {
              console.warn('Share failed, falling back to download:', shareError)
            }
          }

          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          if (isMobile()) {
            showMessage('QR ticket downloaded! Check your Downloads folder.', 'success')
          } else {
            showMessage('QR ticket downloaded successfully!', 'success')
          }
        },
        'image/png',
        1.0
      )
    } catch (error) {
      console.error('Error saving QR ticket:', error)
      showMessage('Failed to save QR ticket. Please try again.', 'error')
    } finally {
      setIsDownloading(false)
    }
  }

  // const downloadAppleWalletPass = () => {
  //   const userId = userInfo.uid
  //   const name = userInfo.displayName
  //   const email = userInfo.email
  //   const url = `https://us-central1-wallet-cloud-func.cloudfunctions.net/getAppleWalletPass?userId=${userId}&name=${name}&email=${email}`
  //   window.location.href = url
  // }

  return (
    <QRContainer>
      <QRInfoMobileWelcome>Welcome, {userInfo.displayName}!</QRInfoMobileWelcome>

      <QRTicketContainer ref={qrTicketRef} backgroundImage={qrcodeBackground}>
        <QRCodeDesign id="QRCodeContainer" hackathon={activeHackathon}>
          <HackerName>{userInfo.displayName}</HackerName>
          <HackerEmail>{userInfo.email}</HackerEmail>

          {/* <QRTags>
            {userInfo.safewalkNote ? <SafeWalk>SafeWalk: Yes</SafeWalk> : <SafeWalk >SafeWalk: No</SafeWalk>}
              <ShirtSize></ShirtSize>
              <Allergies></Allergies>
          </QRTags> */}
          <QR hackathon={activeHackathon}>
            <Canvas
              text={`${baseUrl}/app/${activeHackathon}/social/${userId}`}
              options={{
                level: 'M',
                margin: 2,
                scale: 4.5,
                color: {
                  dark: '#000000',
                  light: '#FFFFFF',
                },
              }}
            />
          </QR>

          {/* <AppleWalletButton onClick={() => downloadAppleWalletPass()} /> */}
        </QRCodeDesign>
      </QRTicketContainer>

      <QRInfo>
        <QRInfoWelcome>Welcome,</QRInfoWelcome>
        <QRInfoName>{userInfo.displayName}!</QRInfoName>
        <QRInfoDes>
          This ticket contains your personal QR code which will be scanned throughout the event.
          Please take a screenshot or otherwise have your QR code ready to scan.
        </QRInfoDes>

        {/* Save Button (Desktop/Mobile) */}
        <DownloadButton onClick={saveQRTicket} disabled={isDownloading}>
          {isDownloading ? 'Generating...' : isMobile() ? 'Save QR Ticket' : 'Download QR Ticket'}
        </DownloadButton>

        {/* Save Message */}
        {saveMessage && <SaveMessage className={messageType}>{saveMessage}</SaveMessage>}
      </QRInfo>
    </QRContainer>
  )
}

export default QrCode
