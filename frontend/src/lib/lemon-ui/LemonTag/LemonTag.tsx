import './LemonTag.scss'

import { Badge as PolarisBadge } from '@shopify/polaris'
import clsx from 'clsx'
import { HTMLProps, forwardRef } from 'react'

import { IconEllipsis, IconX } from '@posthog/icons'

import { LemonButton, LemonButtonWithDropdown } from 'lib/lemon-ui/LemonButton'
import { LemonButtonDropdown } from 'lib/lemon-ui/LemonButton'

export type LemonTagType =
    | 'primary'
    | 'option'
    | 'highlight'
    | 'warning'
    | 'danger'
    | 'success'
    | 'default'
    | 'muted'
    | 'completion'
    | 'caution'
    | 'none'

/**
 * Rendering-only mapping from Lemon's public `type` to Polaris <Badge>'s `tone`.
 * `none` has no dedicated entry: it renders with no badge tone at all (a plain, unstyled tag),
 * same as today's `LemonTag--none` (background: none, no semantic color).
 */
const POLARIS_TONE_BY_LEMON_TYPE: Partial<
    Record<LemonTagType, 'informational' | 'success' | 'attention' | 'warning' | 'critical' | 'complete'>
> = {
    primary: 'informational',
    option: 'informational',
    highlight: 'attention',
    warning: 'warning',
    danger: 'critical',
    success: 'success',
    default: 'informational',
    muted: 'informational',
    completion: 'complete',
    caution: 'warning',
    // `none` intentionally omitted — see above.
}

const POLARIS_SIZE_BY_LEMON_SIZE: Record<NonNullable<LemonTagProps['size']>, 'small' | 'medium'> = {
    small: 'small',
    medium: 'medium',
}

export interface LemonTagProps {
    type?: LemonTagType
    children: React.ReactNode
    size?: 'small' | 'medium'
    weight?: 'normal'
    icon?: JSX.Element
    closable?: boolean
    onClose?: () => void
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    popover?: LemonButtonDropdown
    className?: string
    disabledReason?: string | null
    title?: string
    'data-attr'?: string
    /** When true, the icon will swap to a close icon on hover and the entire tag becomes clickable to close */
    closeOnClick?: boolean
    /** Keep the cursor-pointer / role="button" affordance even when wrapped in a `<Tooltip>` (Base UI's tooltip injects its own onClick which would otherwise suppress it). */
    forceClickable?: boolean
}

export const LemonTag: React.FunctionComponent<
    LemonTagProps & React.RefAttributes<HTMLDivElement> & Omit<HTMLProps<HTMLDivElement>, keyof LemonTagProps>
> = forwardRef(function LemonTag(
    {
        type = 'default',
        children,
        className,
        size = 'medium',
        weight,
        icon,
        closable,
        onClose,
        popover,
        disabledReason,
        closeOnClick,
        onClick,
        forceClickable,
        ...props
    },
    ref
): JSX.Element {
    // Base UI's Tooltip injects an onClick onto its trigger child; don't treat that as dev intent unless forceClickable is set.
    const isTooltipTrigger = 'data-base-ui-tooltip-trigger' in props
    const isCloseClickable = !!(closeOnClick && icon && onClose)
    const isClickable = (!!onClick && (!isTooltipTrigger || forceClickable)) || isCloseClickable

    // Same composition as icon+label above: Polaris <Badge>'s own `icon` prop expects an SVG
    // source component, not an already-rendered element, so icon+text are composed together
    // inside `children` instead (mirroring the approach taken in the LemonButton migration).
    const badgeContent = (
        <>
            {icon && closeOnClick && onClose ? (
                <span className="LemonTag__icon-container">
                    <span className="LemonTag__icon LemonTag__icon--default">{icon}</span>
                    <span className="LemonTag__icon-close LemonTag__icon--hover">
                        <IconX className="h-3.5 w-3.5" />
                    </span>
                </span>
            ) : (
                icon && <span className="LemonTag__icon">{icon}</span>
            )}
            {children}
        </>
    )
    const polarisTone = POLARIS_TONE_BY_LEMON_TYPE[type]

    return (
        <div
            ref={ref}
            className={clsx(
                'LemonTag',
                `LemonTag--size-${size}`,
                disabledReason ? 'cursor-not-allowed' : isClickable ? 'cursor-pointer' : undefined,
                `LemonTag--${type}`,
                weight && `LemonTag--${weight}`,
                closeOnClick && 'LemonTag--close-on-click',
                className
            )}
            role={isClickable ? 'button' : undefined}
            title={disabledReason || undefined}
            aria-disabled={disabledReason ? true : undefined}
            {...props}
            onClick={
                closeOnClick && icon && onClose
                    ? (e) => {
                          e.stopPropagation()
                          onClose()
                      }
                    : onClick
            }
        >
            {
                // `none` renders no badge tone at all — a plain, unstyled tag, same as today's
                // `LemonTag--none` (no background/border color). Every other type delegates its
                // visual tone/surface to a real Polaris `<Badge>`.
                polarisTone ? (
                    <PolarisBadge tone={polarisTone} size={POLARIS_SIZE_BY_LEMON_SIZE[size]}>
                        {/* Badge's declared children type is `string`, but it doesn't runtime-enforce
                            it — same cast as the LemonButton migration to pass composed icon+text. */}
                        {badgeContent as any}
                    </PolarisBadge>
                ) : (
                    badgeContent
                )
            }
            {popover?.overlay && (
                <LemonButtonWithDropdown
                    dropdown={popover}
                    size="small"
                    className="LemonTag__right-button"
                    icon={<IconEllipsis />}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                />
            )}
            {closable && !(closeOnClick && icon && onClose) && (
                <LemonButton
                    icon={<IconX className="h-3.5 w-3.5" />}
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose?.()
                    }}
                    size="xsmall"
                    className="LemonTag__right-button"
                />
            )}
        </div>
    )
})
