import { css } from '@emotion/css'
import { ComponentType, useMemo } from 'react'
import { EditorProps } from './types'
import { nanoid } from 'nanoid'

export type InputSectionProps<T, D> = Omit<EditorProps<T, D>, 'id'> & {
  name: string
  description: string
  Editor: ComponentType<EditorProps<T, D>>
}

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  padding: 14px;
  pointer-events: auto;
`

const labelStyle = css`
  font-size: 1em;
  color: #ffffff;
  margin-bottom: 2px;
  pointer-events: auto;
`

const descriptionStyle = css`
  font-size: 0.8em;
  margin-bottom: 10px;
  color: #ffffffaa;
`

export function InputSection<T, D = void>({
  Editor,
  name,
  value,
  data,
  description,
  onChange,
}: InputSectionProps<T, D>) {
  const id = useMemo(() => {
    const lcname = name.toLowerCase().replace(/^\W/gi, '').replace(/\s+/g, '-')
    return `${lcname}-${nanoid()}`
  }, [name])

  return (
    <div className={sectionStyle}>
      <label className={labelStyle} htmlFor={id}>
        {name}
      </label>
      <span className={descriptionStyle}>{description}</span>
      <Editor id={id} value={value} data={data} onChange={onChange} />
    </div>
  )
}
