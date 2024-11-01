import { css } from '@emotion/css'
import { FC } from 'react'
import { DurationConfig, DurationItem } from './types'
import { Switch } from '../Switch'
import { noop } from '../../../../common/utils'
import { useNoteDurations } from './useNoteDurations'
import { useRestDurations } from './useRestDurations'
import { Slider } from '../Slider/Slider'

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`

const rowStyle = css`
  &:nth-of-type(even) {
    background-color: #00000010;
  }
  &:nth-of-type(odd) {
    background-color: #00000000;
  }
`

const tdStyle = css`
  border: 1px solid #00000020;
  font-weight: 400;
  text-align: center;
  padding: 4px;
  height: 50px;
`

const thStyle = css`
  border: 1px solid #00000020;
  font-weight: 400;
  text-align: center;
  padding: 4px;
`

type GenericDurationGridProps = {
  items: DurationItem[]
  // value: DurationConfig
  // onChange: (value: DurationConfig) => void
}

export const GenericDurationGrid: FC<GenericDurationGridProps> = ({
  items,
}) => {
  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th style={{ width: 100 }}></th>
          <th className={thStyle} style={{ width: 100 }}>
            Enabled
          </th>
          <th className={thStyle}>Clusters</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const key = `${item.duration}-${item.type}`
          const switchId = `${item.duration}-${item.type}-enabled`
          return (
            <tr className={rowStyle} key={key}>
              <th className={tdStyle}>
                <item.Component />
              </th>
              <td className={tdStyle}>
                <Switch value={item.isSelected} id={switchId} onChange={noop} />
              </td>
              <td className={tdStyle}>
                <Slider max={8} value={2} onChange={noop} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export type DurationsGridProps = {
  value: DurationConfig
  onChange: (value: DurationConfig) => void
}

export const NoteDurationsGrid: FC<DurationsGridProps> = ({ value }) => {
  const items = useNoteDurations(value)
  return <GenericDurationGrid items={items} />
}

export const RestDurationsGrid: FC<DurationsGridProps> = ({ value }) => {
  const items = useRestDurations(value)
  return <GenericDurationGrid items={items} />
}
