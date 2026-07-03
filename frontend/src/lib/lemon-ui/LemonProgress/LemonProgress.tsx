import { ProgressBar as PolarisProgressBar } from '@shopify/polaris'
import clsx from 'clsx'
import { forwardRef } from 'react'

/** Default colors — used to detect whether a caller customised the bar (see render logic below). */
const DEFAULT_BG_COLOR = 'var(--color-bg-primary)'
const DEFAULT_STROKE_COLOR = 'var(--brand-blue)'

/**
 * Lemon "medium" is a 6px bar and "large" a 20px one; the closest Polaris <ProgressBar> sizes
 * are "small" (8px) and "medium" (16px). Polaris "large" (32px) has no Lemon counterpart.
 */
const POLARIS_SIZE_BY_LEMON_SIZE: Record<'medium' | 'large', 'small' | 'medium'> = {
    medium: 'small',
    large: 'medium',
}

export type LemonProgressProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: 'medium' | 'large'
    bgColor?: string
    strokeColor?: string
    percent: number
    /**
     * Whether to use a CSS transition for the bar. This is the default behavior.
     * Useful to disable if you already have smooth movement thanks to extremely frequent updates (50+ per second).
     * @default true
     */
    smoothing?: boolean
    children?: React.ReactNode
    className?: string
}

export const LemonProgress: React.FunctionComponent<LemonProgressProps & React.RefAttributes<HTMLDivElement>> =
    forwardRef(function LemonProgress(
        {
            size = 'medium',
            percent,
            smoothing = true,
            bgColor = 'var(--color-bg-primary)',
            strokeColor = 'var(--brand-blue)',
            children,
            className,
            ...rest
        },
        ref
    ): JSX.Element {
        const width = isNaN(percent) ? 0 : Math.max(Math.min(percent, 100), 0)

        // Standard bars (default colors, no content inside the track) render a real Polaris
        // <ProgressBar>. Polaris doesn't support arbitrary `bgColor`/`strokeColor` values or
        // children inside the moving track, so those cases keep the legacy rendering below.
        // The wrapper div preserves the public API: ref, `className` and spread HTML attributes.
        if (bgColor === DEFAULT_BG_COLOR && strokeColor === DEFAULT_STROKE_COLOR && children == null) {
            return (
                <div ref={ref} {...rest} className={clsx('LemonProgress w-full inline-block', className)}>
                    <PolarisProgressBar
                        progress={width}
                        size={POLARIS_SIZE_BY_LEMON_SIZE[size]}
                        tone="primary"
                        animated={smoothing}
                    />
                </div>
            )
        }

        return (
            <div
                ref={ref}
                {...rest}
                className={clsx(
                    'LemonProgress rounded-full w-full inline-block',
                    size === 'large' ? 'h-5' : 'h-1.5',
                    className
                )}
                // eslint-disable-next-line react/forbid-dom-props
                style={{ backgroundColor: bgColor }}
            >
                <span
                    className={clsx(
                        'LemonProgress__track block h-full rounded-full',
                        width > 0 ? (size === 'large' ? 'min-w-5' : 'min-w-1.5') : null,
                        smoothing && 'transition-all'
                    )}
                    // eslint-disable-next-line react/forbid-dom-props
                    style={{ width: `${width}%`, backgroundColor: strokeColor }}
                >
                    {children}
                </span>
            </div>
        )
    })
