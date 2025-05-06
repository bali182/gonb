import { css, cx } from '@emotion/css'
import { Component, ReactElement } from 'react'
import { Translation } from 'react-i18next'
import { isNil } from '../common/utils'
import { Button } from './Button'
import { AppDispatch } from '../state/store'
import { connect } from 'react-redux'
import { generatorSlice } from '../state/generatorSlice'
import { initialState } from '../state/initialState'
import { PiArrowClockwiseBold } from 'react-icons/pi'
import {
  bodyTextStyle,
  headerStyle,
  MOBILE_SELECTOR,
  smallTextStyle,
  subHeaderStyle,
  TABLET_SELECTOR,
} from './constants'

type ErrorBoundaryState = {
  error: Error | undefined
}

type ErrorBoundaryProps = {
  children: ReactElement
  reset: () => void
}

const errorContainerStyle = css`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  @supports (height: 100dvh) {
    height: min(100vh, 100dvh);
  }
  backdrop-filter: blur(30px);
  background-color: #ffffff99;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${MOBILE_SELECTOR} {
    padding: 10px;
  }
  @media ${TABLET_SELECTOR} {
    padding: 10px;
  }
`

const contentContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  text-align: center;
  gap: 10px;
`

const titleStyle = cx(
  headerStyle,
  css`
    color: #000000;
  `,
)

const descriptionStyle = cx(
  bodyTextStyle,
  css`
    color: #00000090;
  `,
)

const errorMessageStyle = cx(
  bodyTextStyle,
  css`
    padding: 10px;
    background-color: #00000010;
    border-radius: 10px;
    text-align: left;
    max-width: 800px;
    overflow: auto;
    @media ${MOBILE_SELECTOR} {
      max-width: calc(100vw - 20px);
      max-height: 50vh;
    }
    @media ${TABLET_SELECTOR} {
      max-width: calc(100vw - 20px);
      max-height: 50vh;
    }
  `,
)

class _ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: undefined }
  }

  componentDidCatch(error: Error) {
    this.setState({ error })
  }

  reset() {
    localStorage.clear()
    this.props.reset()
    location.reload()
  }

  render() {
    const { error } = this.state
    if (isNil(error)) {
      return this.props.children
    } else {
      return (
        <div className={errorContainerStyle}>
          <div className={contentContainer}>
            <h1 className={titleStyle}>
              <Translation>{(t) => t('ErrorBoundary.Title')}</Translation>
            </h1>
            <span className={descriptionStyle}>
              <Translation>{(t) => t('ErrorBoundary.Explanation')}</Translation>
            </span>
            <pre className={errorMessageStyle}>
              {error.stack ?? error.message}
            </pre>
            <Button onClick={this.reset.bind(this)}>
              <PiArrowClockwiseBold />
              <Translation>{(t) => t('ErrorBoundary.Reset')}</Translation>
            </Button>
          </div>
        </div>
      )
    }
  }
}

// Map dispatch to props
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  reset: (): void => {
    dispatch(generatorSlice.actions.setGeneratorConfig(initialState.generator))
  },
})

export const ErrorBoundary = connect(
  undefined,
  mapDispatchToProps,
)(_ErrorBoundary)
