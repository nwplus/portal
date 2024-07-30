import React from 'react'
import styled from 'styled-components'
import MoonLoader from 'react-spinners/MoonLoader'

const LoaderWrapper = styled.div`
  display: block;
  position: fixed;
  top: 50%;
  right: 50%;
  margin-top: -40px;
  margin-right: -40px;
  z-index: 1031;
`

const Loading = ({ loading, color = '#78FF96', size = 80 }) => (
  <LoaderWrapper>
    <MoonLoader color={color} size={size} loading={loading} />
  </LoaderWrapper>
)

export default Loading
