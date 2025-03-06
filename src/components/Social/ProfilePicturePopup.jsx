import React, { useState } from 'react'
import styled from 'styled-components'
import one from '../../assets/profilePictures/1.svg'
import two from '../../assets/profilePictures/2.svg'
import three from '../../assets/profilePictures/3.svg'
import four from '../../assets/profilePictures/4.svg'
import five from '../../assets/profilePictures/5.svg'
import six from '../../assets/profilePictures/6.svg'
import seven from '../../assets/profilePictures/7.svg'
import eight from '../../assets/profilePictures/8.svg'
import nine from '../../assets/profilePictures/9.svg'
import ten from '../../assets/profilePictures/10.svg'
import eleven from '../../assets/profilePictures/11.svg'
import twelve from '../../assets/profilePictures/12.svg'
import thirteen from '../../assets/profilePictures/13.svg'
import fourteen from '../../assets/profilePictures/14.svg'
import fifteen from '../../assets/profilePictures/15.svg'
import sixteen from '../../assets/profilePictures/16.svg'
import seventeen from '../../assets/profilePictures/17.svg'
import eighteen from '../../assets/profilePictures/18.svg'
import CloseIcon from '../../assets/close.svg?react'
import { Button } from '../Input'

const profilePictures = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  fourteen,
  fifteen,
  sixteen,
  seventeen,
  eighteen,
]

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const PopupContainer = styled.div`
  background-color: ${p => p.theme.colors.backgroundSecondary};
  padding: 50px 20px 0px;
  border-radius: 8px;
  width: 450px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  ${p => p.theme.mediaQueries.mobile} {
    width: 70vw;
    padding: 30px 30px 15px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px 25px;
  gap: 25px;
  overflow-y: scroll;
  max-height: 400px;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${p => p.theme.colors.button.secondary.background.default};
    border-radius: 1px;
  }
  scrollbar-color: black transparent;

  ${p => p.theme.mediaQueries.mobile} {
    padding: 10px 10px;
    gap: 15px;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }
`

const ProfilePic = styled.img`
  width: 100%;
  object-fit: contain;
  cursor: pointer;
  border-radius: 100%;
  border: 4px solid
    ${p => (p.selected ? p.theme.colors.button.secondary.background.default : 'transparent')};
  transition: transform 0.3s ease;

  &:hover {
    border-color: ${p => p.theme.colors.button.secondary.background.default};
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const StyledCloseIcon = styled(CloseIcon)`
  width: 30px;
  height: 30px;

  & path {
    stroke: ${p => p.theme.colors.text};
    stroke-width: 2px;
    transform: scale(0.85);
    transform-origin: center;
  }
`

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const SaveButton = styled(Button)`
  box-shadow: none;
  font-size: 0.8rem;
  margin: 20px 0;

  ${p => p.theme.mediaQueries.mobile} {
    margin-top: 10px;
    margin-bottom: 0;
  }
`

const ProfilePicturePopup = ({ closePopup, selectProfilePicture }) => {
  const [selectedPic, setSelectedPic] = useState(null)

  const handleSelect = index => {
    setSelectedPic(index)
  }

  const handleSave = () => {
    if (selectedPic !== null) {
      selectProfilePicture(selectedPic + 1)
      closePopup()
    }
  }

  return (
    <PopupOverlay>
      <PopupContainer>
        <CloseButton
          onClick={() => {
            closePopup()
          }}
        >
          <StyledCloseIcon />
        </CloseButton>
        <Grid>
          {profilePictures.map((pic, index) => (
            <ProfilePic
              key={index}
              src={pic}
              alt={`Profile ${index + 1}`}
              onClick={() => handleSelect(index)}
              selected={selectedPic === index}
            />
          ))}
        </Grid>
        <SaveButtonContainer>
          <SaveButton color="secondary" width="flex" onClick={handleSave}>
            Select Nugget
          </SaveButton>
        </SaveButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  )
}

export default ProfilePicturePopup
