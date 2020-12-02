import React from 'react'
import { css } from '@emotion/core'
import MoonLoader from 'react-spinners/MoonLoader'

const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  background-size: 100%;
  z-index: 900;
`

export default ({ loading }) => (
  <MoonLoader css={override} color="#fff" size={80} loading={loading} />
)
