import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { TxlemetryMark } from './TxlemetryBrand'

export function Logomark(): JSX.Element {
    return <TxlemetryMark />
}

export interface AnimatedLogomarkProps {
    animate: boolean
    animateOnce?: () => void
    className?: string
}

export function AnimatedLogomark({ animate, animateOnce, className }: AnimatedLogomarkProps): JSX.Element {
    const ref = useRef<HTMLDivElement | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const shouldStopRef = useRef(false)
    const animateOnceRef = useRef(animateOnce)

    animateOnceRef.current = animateOnce
    shouldStopRef.current = !animate && isAnimating

    useEffect(() => {
        if (animate || animateOnce) {
            setIsAnimating(true)
        }
    }, [animate, animateOnce])

    useEffect(() => {
        if (!isAnimating || !ref.current) {
            return
        }

        const animatedElement = ref.current.firstElementChild
        if (!animatedElement) {
            return
        }

        const handleAnimationIteration = (): void => {
            if (animateOnceRef.current) {
                setIsAnimating(false)
                animateOnceRef.current()
            } else if (shouldStopRef.current) {
                setIsAnimating(false)
            }
        }

        animatedElement.addEventListener('animationiteration', handleAnimationIteration)
        return () => {
            animatedElement.removeEventListener('animationiteration', handleAnimationIteration)
        }
    }, [isAnimating])

    return (
        <div ref={ref} className={clsx(className, isAnimating && 'animate-logomark-jump-continuous')}>
            <Logomark />
        </div>
    )
}
