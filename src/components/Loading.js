import React from 'react'
import { css } from '@emotion/core'
import MoonLoader from 'react-spinners/MoonLoader'

const override = css`
  display: block;
  position: fixed;
  top: 50%;
  right: 50%;
  margin-top: -40px;
  margin-right: -40px;
  z-index: 1031;
`

export default ({ loading, size = 80 }) => (
  <MoonLoader css={override} color="#fff" size={size} loading={loading} />
)
