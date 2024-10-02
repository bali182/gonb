import React from 'react'
import { useTranslation } from 'react-i18next'
import { MessageKey, Messages } from './languages/types'

declare module 'react' {
  interface DOMAttributes<T> {
    'data-tooltip'?: MessageKey
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en'
    resources: {
      en: Messages
      hu: Messages
    }
  }
}
