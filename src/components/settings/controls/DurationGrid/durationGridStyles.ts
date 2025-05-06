import { css, cx } from '@emotion/css'
import { smallIconStyle, smallTextStyle } from '../../../constants'

export const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`

export const rowStyle = css`
  &:nth-of-type(even) {
    background-color: #00000010;
    &:hover {
      background-color: #00000015;
    }
  }

  &:nth-of-type(odd) {
    background-color: #00000000;
    &:hover {
      background-color: #00000010;
    }
  }
`

export const disabledRowStyle = css`
  background-color: #00000020;
  cursor: not-allowed;
`

export const tdStyle = css`
  border: 1px solid #ccc;
  font-weight: 400;
  height: 45px;
`

export const clickableCellStyle = css`
  cursor: pointer;
  position: relative;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`

export const pointerCursorStyle = css`
  cursor: pointer;
`

export const disabledCellStyle = css`
  cursor: not-allowed;
`

export const checkIconStyle = cx(
  smallIconStyle,
  css`
    position: absolute;
    bottom: 5px;
    right: 10px;
  `,
)

export const hollowCheckIconStyle = css`
  color: #666;
`

export const checkedCheckIconStyle = css`
  color: green;
`

const thStyle = cx(
  smallTextStyle,
  css`
    border: 1px solid #ccc;
    font-weight: 400;
    text-align: center;
    height: 45px;
  `,
)

export const emptyThStyle = css`
  width: 75px;
`

export const probabilityThStyle = cx(
  thStyle,
  css`
    width: 120px;
  `,
)

export const clusterThStyle = cx(thStyle, css``)

export const disabledClusterStyle = cx(
  smallTextStyle,
  css`
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    color: #00000090;
    text-align: left;
    padding-left: 10px;
  `,
)

export const clusterTdStyle = css`
  padding: 0px 20px;
  text-align: center;
`

export const frequencyPickerTdStyle = css`
  padding: 0px;
`
