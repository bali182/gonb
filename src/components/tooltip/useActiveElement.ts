import { useEffect, useState } from 'react'

export const useActiveElement = (
  dataTag: string = 'data-tooltip',
): HTMLElement | undefined => {
  const [element, setElement] = useState<HTMLElement>()

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null

      while (target && target !== document.body) {
        if (target.hasAttribute(dataTag)) {
          setElement(target)
          return
        }
        target = target.parentElement
      }
      setElement(undefined)
    }

    const handleMouseOut = (e: MouseEvent) => {
      let relatedTarget = e.relatedTarget as HTMLElement | null

      while (relatedTarget && relatedTarget !== document.body) {
        if (relatedTarget.hasAttribute(dataTag)) {
          return
        }
        relatedTarget = relatedTarget.parentElement
      }

      setElement(undefined)
    }

    const resetElement = () => {
      setElement(undefined)
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('wheel', resetElement)
    document.addEventListener('keydown', resetElement)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('wheel', resetElement)
      document.removeEventListener('keydown', resetElement)
    }
  }, [])

  return element
}
