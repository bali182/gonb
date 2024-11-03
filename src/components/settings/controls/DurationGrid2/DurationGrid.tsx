import { cx } from '@emotion/css'
import { FC } from 'react'
import { DurationItem } from './types'
import { Switch } from '../Switch'
import { useDurationItems } from './useDurationItems'
import { ClusterSizeSlider } from '../ClusterSizeSlider/ClusterSizeSlider'
import { DurationFrequencyPicker } from '../DurationFrequencyPicker/DurationFrequencyPicker'
import { DurationFrequency } from '../../../../common/durationFrequency'
import {
  clusterTdStyle,
  clusterThStyle,
  disabledClusterStyle,
  emptyThStyle,
  enabledThStyle,
  frequencyPickerTdStyle,
  probabilityThStyle,
  rowStyle,
  tableStyle,
  tdCenterAlignerStyle,
  tdStyle,
} from './durationGridStyles'
import { useTranslation } from 'react-i18next'
import { Duration } from '../../../../common/duration'
import { DurationConfig } from '../../../../state/types'
import { DurationType } from '../../../../common/durationType'

type InternalDurationGridProps = {
  value: DurationItem[]
  onChange: (items: DurationItem[]) => void
}

const InternalDurationGrid: FC<InternalDurationGridProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation()

  const update = (duration: Duration, updates: Partial<DurationItem>) => {
    const newItems = value.map((i): DurationItem => {
      return i.duration === duration ? { ...i, ...updates } : i
    })
    onChange(newItems)
  }

  const onItemToggled = (item: DurationItem) => (isEnabled: boolean) =>
    update(item.duration, { isEnabled })

  const onFrequencyChange =
    (item: DurationItem) => (frequency: DurationFrequency) =>
      update(item.duration, { frequency })

  const onClusterChange = (item: DurationItem) => (cluster: number) =>
    update(item.duration, { cluster })

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th className={emptyThStyle}></th>
          <th className={enabledThStyle}>{t('DurationGrid.Enabled')}</th>
          <th className={probabilityThStyle}>
            {t('DurationGrid.Probability')}
          </th>
          <th className={clusterThStyle}>{t('DurationGrid.ClusterSize')}</th>
        </tr>
      </thead>
      <tbody>
        {value.map((item) => {
          const key = `${item.duration}-${item.type}`
          const switchId = `${item.duration}-${item.type}-enabled`
          return (
            <tr className={rowStyle} key={key}>
              <th className={tdStyle}>
                <item.Component />
              </th>
              <td className={tdStyle}>
                <div className={tdCenterAlignerStyle}>
                  <Switch
                    value={item.isEnabled}
                    id={switchId}
                    onChange={onItemToggled(item)}
                  />
                </div>
              </td>
              {item.isEnabled ? (
                <>
                  <td className={cx(tdStyle, frequencyPickerTdStyle)}>
                    <DurationFrequencyPicker
                      value={item.frequency}
                      onChange={onFrequencyChange(item)}
                    />
                  </td>
                  <td className={cx(tdStyle, clusterTdStyle)}>
                    <ClusterSizeSlider
                      max={item.maxCluster}
                      value={item.cluster ?? 1}
                      onChange={onClusterChange(item)}
                    />
                  </td>
                </>
              ) : (
                <td className={tdStyle} colSpan={2}>
                  <div className={disabledClusterStyle}>
                    {item.name} {t('DurationGrid.IsDisabled')}
                  </div>
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export type DurationsGridProps = {
  type: DurationType
  dotted: boolean
  value: DurationConfig
  onChange: (value: DurationConfig) => void
}

export const DurationGrid: FC<DurationsGridProps> = ({
  value,
  type,
  dotted,
  onChange,
}) => {
  const [items, setItems] = useDurationItems(type, dotted, value, onChange)
  return <InternalDurationGrid value={items} onChange={setItems} />
}
