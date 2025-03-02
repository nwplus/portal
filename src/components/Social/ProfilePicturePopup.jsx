import React from 'react'
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
`

const PopupContainer = styled.div`
  background-color: white;
  padding: 20px;
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
  gap: 10px;
  overflow-y: auto;
  max-height: 400px;
`

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: #ff6f61;
  cursor: pointer;
`

const SaveButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`

const ProfilePicturePopup = ({ closePopup, selectProfilePicture }) => {
  return (
    <PopupOverlay>
      <PopupContainer>
        <CloseButton
          onClick={() => {
            console.log('Click')
            closePopup()
          }}
        >
          X
        </CloseButton>
        <Grid>
          {profilePictures.map((pic, index) => (
            <ProfilePic
              key={index}
              src={pic}
              alt={`Profile ${index + 1}`}
              onClick={() => {
                selectProfilePicture(index + 1)
              }}
            />
          ))}
        </Grid>
      </PopupContainer>
    </PopupOverlay>
  )
}

export default ProfilePicturePopup
