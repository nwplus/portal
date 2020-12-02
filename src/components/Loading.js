import React from 'react'
import styled from 'styled-components'
import { css } from '@emotion/core'
import MoonLoader from 'react-spinners/MoonLoader'
import logo from '../assets/logo.svg'

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 200;
`
const override = css`
  display: block;
  margin: 0 auto;
  position: relative;
  z-index: 200;
`

export default ({ loading }) => (
  <LoadingContainer>
    <MoonLoader css={override} color="#fff" size={80} loading={loading} />
  </LoadingContainer>
)
