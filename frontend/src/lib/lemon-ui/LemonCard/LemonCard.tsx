import './LemonCard.scss'

import { forwardRef } from 'react'

import { IconX } from '@posthog/icons'

import { cn } from 'lib/utils/css-classes'

import { LemonButton } from '../LemonButton'

export interface LemonCardProps {
    hoverEffect?: boolean
    className?: string
    children?: React.ReactNode
    onClick?: () => void
    focused?: boolean
    'data-attr'?: string
    closeable?: boolean
    onClose?: () => void
}

/**
 * Polaris migration note: LemonCard deliberately does NOT nest Polaris `<Card>`.
 * Its public contract is "consumers style the box via `className` on the root element"
 * (call sites pass `p-0`/`p-4`, `border-2`, `border-transparent`, `overflow-hidden`...),
 * which is incompatible with delegating the surface to an inner Polaris Card — that would
 * draw a second box inside the padded root and detach the absolute-positioned close button.
 * The card surface already uses Polaris design tokens (border/background/radius) via base.scss.
 */
export const LemonCard = forwardRef<HTMLDivElement, LemonCardProps>(function LemonCard(
    { hoverEffect = true, className, children, onClick, focused, closeable, onClose, ...props },
    ref
): JSX.Element {
    return (
        <div
            ref={ref}
            className={cn(
                'LemonCard border rounded p-6 bg-surface-primary relative',
                {
                    'LemonCard--hoverEffect': hoverEffect,
                    'border-2 border-accent': focused,
                    'border-primary': !focused,
                    'cursor-pointer': !!onClick && !focused,
                },
                className
            )}
            onClick={onClick}
            {...props}
        >
            {closeable ? (
                <div className="absolute top-2 right-2">
                    <LemonButton
                        icon={<IconX />}
                        onClick={(e) => {
                            e.stopPropagation()
                            onClose?.()
                        }}
                        type="tertiary"
                        size="xsmall"
                    />
                </div>
            ) : null}
            {children}
        </div>
    )
})
