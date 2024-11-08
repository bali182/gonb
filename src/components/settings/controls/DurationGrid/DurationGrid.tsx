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
  disabledRowStyle,
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
import { DurationConfig, TimeSignature } from '../../../../state/types'
import { DurationType } from '../../../../common/durationType'
import { t } from 'i18next'
import { isNil } from '../../../../common/utils'

type InternalDurationGridProps = {
  value: DurationItem[]
  onChange: (items: DurationItem[]) => void
}

function getJoinedRowLabel(item: DurationItem): string {
  const { isEnabled, isSelected, name, timeSignature } = item
  if (isEnabled && !isSelected) {
    return `${name} ${t('DurationGrid.IsNotActive')}`
  }
  if (!isEnabled) {
    if (isNil(timeSignature.lower) || isNil(timeSignature.upper)) {
      return t('Validation.DurationInvalidBecauseOfTimeSignature')
    }
    return t('DurationGrid.DurationTooLong', {
      duration: name.toLowerCase(),
    })
  }
  throw new Error(`Unknown situation with duration ${name}`)
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
    update(item.duration, { isSelected: isEnabled })

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
          const fullRowStyle = item.isEnabled ? rowStyle : disabledRowStyle
          return (
            <tr className={fullRowStyle} key={key}>
              <th className={tdStyle}>
                <item.Component />
              </th>
              <td className={tdStyle}>
                <div className={tdCenterAlignerStyle}>
                  <Switch
                    value={item.isSelected}
                    id={switchId}
                    onChange={onItemToggled(item)}
                    disabled={!item.isEnabled && !item.isSelected}
                  />
                </div>
              </td>
              {item.isSelected && item.isEnabled ? (
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
                    {getJoinedRowLabel(item)}
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
  timeSignature: Partial<TimeSignature>
  onChange: (value: DurationConfig) => void
}

export const DurationGrid: FC<DurationsGridProps> = ({
  value,
  type,
  dotted,
  timeSignature,
  onChange,
}) => {
  const [items, setItems] = useDurationItems(
    type,
    dotted,
    value,
    timeSignature,
    onChange,
  )
  return <InternalDurationGrid value={items} onChange={setItems} />
}
