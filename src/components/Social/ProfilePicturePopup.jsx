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
import close from '../../assets/profilePictures/close.png'
import save from '../../assets/profilePictures/save.png'

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
  padding: 50px 40px 20px; // Reduced bottom padding
  border-radius: 8px;
  width: 350px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
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
`

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  border-radius: 100px;
  border: 2px solid ${p => (p.selected ? 'red' : 'transparent')};
  transition: transform 0.3s ease;

  &:hover {
    border-color: red;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 2px;
  right: -10px;
  background-color: transparent;
  border: none;
  color: #ff6f61;
  cursor: pointer;

  img {
    width: 75%;
    height: 75%;
  }
`

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const SaveButton = styled.img`
  margin-top: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
  width: 25%;
  height: 25%;

  &:hover {
    transform: scale(1.1);
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
            console.log('Click')
            closePopup()
          }}
        >
          <img src={close} alt="" />
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
          <SaveButton src={save} alt="Save" onClick={handleSave} />
        </SaveButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  )
}

export default ProfilePicturePopup
