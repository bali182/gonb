import { css, cx } from '@emotion/css'

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

export const tdStyle = css`
  border: 1px solid #00000020;
  font-weight: 400;
  height: 45px;
`

export const tdCenterAlignerStyle = css`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const thStyle = css`
  border: 1px solid #00000020;
  font-weight: 400;
  text-align: center;
  font-size: 1em;
  height: 45px;
`

export const emptyThStyle = css`
  width: 75px;
`

export const enabledThStyle = cx(
  thStyle,
  css`
    width: 85px;
  `,
)
export const probabilityThStyle = cx(
  thStyle,
  css`
    width: 120px;
  `,
)

export const clusterThStyle = cx(thStyle, css``)

export const disabledClusterStyle = css`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: #00000090;
  text-align: left;
  margin-left: 10px;
  line-height: 1.2em;
`

export const clusterTdStyle = css`
  padding: 0px 20px;
  text-align: center;
`

export const frequencyPickerTdStyle = css`
  padding: 0px;
`
