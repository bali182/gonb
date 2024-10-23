import { css } from '@emotion/css'

export const tableStyle = css`
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;

  tr:nth-child(odd) > td:nth-child(odd) {
    background-color: #00000010;
  }
  tr:nth-child(odd) > td:nth-child(even) {
    background-color: #00000015;
  }
  tr:nth-child(even) > td:nth-child(odd) {
    background-color: #00000020;
  }
  tr:nth-child(even) > td:nth-child(even) {
    background-color: #00000025;
  }
`

export const thStyle = css`
  text-align: center;
  padding: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 38px;
  font-weight: 400;
  font-size: 0.9em;
  border: 1px solid #00000050;
  &:hover {
    background-color: #00000030 !important;
  }
`

export const tdStyle = css`
  padding: 6px;
  font-size: 0.8em;
  text-align: center;
  cursor: pointer;
  position: relative;
  border: 1px solid #00000050;
  &:hover {
    background-color: #00000050 !important;
  }
`

export const selectedStyle = css`
  background-color: #000000aa !important;
  color: #fff;
  &:hover {
    background-color: #000000cc !important;
  }
`

export const disabledStyle = css`
  background-color: #00000020 !important;
  color: #999 !important;
  cursor: not-allowed;
  &:hover {
    background-color: #00000020 !important;
  }
`
