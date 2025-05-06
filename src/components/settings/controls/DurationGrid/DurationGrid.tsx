import { cx } from '@emotion/css'
import { FC } from 'react'
import { DurationItem } from './types'
import { useDurationItems } from './useDurationItems'
import { ClusterSizeSlider } from '../ClusterSizeSlider/ClusterSizeSlider'
import { DurationFrequencyPicker } from '../DurationFrequencyPicker/DurationFrequencyPicker'
import { DurationFrequency } from '../../../../common/durationFrequency'
import {
  checkedCheckIconStyle,
  checkIconStyle,
  clickableCellStyle,
  clusterTdStyle,
  clusterThStyle,
  disabledCellStyle,
  disabledClusterStyle,
  disabledRowStyle,
  emptyThStyle,
  frequencyPickerTdStyle,
  hollowCheckIconStyle,
  pointerCursorStyle,
  probabilityThStyle,
  rowStyle,
  tableStyle,
  tdStyle,
} from './durationGridStyles'
import { useTranslation, UseTranslationResponse } from 'react-i18next'
import { Duration } from '../../../../common/duration'
import { DurationConfig, TimeSignature } from '../../../../state/types'
import { DurationType } from '../../../../common/durationType'
import { capitalize, isNil } from '../../../../common/utils'
import { PiCheckFatFill, PiCheckFatThin, PiXLight } from 'react-icons/pi'

type InternalDurationGridProps = {
  value: DurationItem[]
  onChange: (items: DurationItem[]) => void
}

function getJoinedRowLabel(
  item: DurationItem,
  { t }: UseTranslationResponse<'en', any>,
): string {
  const { isEnabled, isSelected, name, timeSignature } = item
  if (isEnabled && !isSelected) {
    return `${name} ${t('DurationGrid.IsNotActive')}`
  }
  if (!isEnabled) {
    if (isNil(timeSignature.lower) || isNil(timeSignature.upper)) {
      return t('Validation.DurationInvalidBecauseOfTimeSignature')
    }
    return capitalize(
      t('DurationGrid.DurationTooLong', {
        duration: name.toLocaleLowerCase(),
      }),
    )
  }
  throw new Error(`Unknown situation with duration ${name}`)
}

const InternalDurationGrid: FC<InternalDurationGridProps> = ({
  value,
  onChange,
}) => {
  const resp = useTranslation()
  const { t } = resp

  const update = (duration: Duration, updates: Partial<DurationItem>) => {
    const newItems = value.map((i): DurationItem => {
      return i.duration === duration ? { ...i, ...updates } : i
    })
    onChange(newItems)
  }

  const onItemToggled = (item: DurationItem) => () =>
    update(item.duration, { isSelected: !item.isSelected })

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
          <th className={probabilityThStyle}>
            {t('DurationGrid.Probability')}
          </th>
          <th className={clusterThStyle}>{t('DurationGrid.ClusterSize')}</th>
        </tr>
      </thead>
      <tbody>
        {value.map((item) => {
          const key = `${item.duration}-${item.type}`
          const fullRowStyle = cx({
            [rowStyle]: item.isEnabled,
            [disabledRowStyle]: !item.isEnabled,
          })
          const nameCellStyle = cx(tdStyle, clickableCellStyle, {
            [disabledCellStyle]: !item.isEnabled && !item.isSelected,
          })
          const mergedCellStyle = cx(tdStyle, {
            [pointerCursorStyle]: item.isEnabled,
          })
          const CheckBoxIcon = item.isSelected ? PiCheckFatFill : PiCheckFatThin
          const NameCellIcon =
            item.isEnabled || item.isSelected ? CheckBoxIcon : PiXLight
          const checkIconFullStyle = cx(checkIconStyle, {
            [hollowCheckIconStyle]: !item.isSelected,
            [checkedCheckIconStyle]: item.isSelected,
          })
          const onItemToggledHandler =
            item.isEnabled || item.isSelected ? onItemToggled(item) : undefined

          return (
            <tr className={fullRowStyle} key={key}>
              <th className={nameCellStyle} onClick={onItemToggledHandler}>
                <item.Component />
                <NameCellIcon className={checkIconFullStyle} />
              </th>
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
                <td
                  className={mergedCellStyle}
                  colSpan={2}
                  onClick={onItemToggledHandler}
                >
                  <div className={disabledClusterStyle}>
                    {getJoinedRowLabel(item, resp)}
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
