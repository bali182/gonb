import { Clef } from '../../../../common/clef'

export type ClefModel = {
  clef: Clef
  label: string
  alternateName: string
  iconStyle?: string
  icon: string
  isEnabled: boolean
}
