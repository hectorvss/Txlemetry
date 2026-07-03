import './LemonBadge.scss'

import clsx from 'clsx'
import { forwardRef } from 'react'

import { compactNumber, humanFriendlyNumber } from 'lib/utils/numbers'

/**
 * POLARIS MIGRATION NOTE (no change, on purpose — same criterion as LemonSwitch/LemonSkeleton):
 *
 * Despite the shared name, LemonBadge is NOT Polaris's <Badge>. LemonBadge is an icon-sized
 * NOTIFICATION badge: a numeric counter / dot that is absolutely `position`ed (top-left/top-right/…)
 * over another element, with a `status` color, `size`, `active`/`visible` states, dot mode when there's
 * no `content`, and a `.Number` variant that formats counts ("9+", compactNumber, etc.).
 *
 * Polaris v13 <Badge> (Badge/Badge.d.ts) is a TEXT label chip: `children?: string`, `tone?: Tone`,
 * `progress?`, `icon?: IconSource`, `size?`. It has no positioning, no dot/counter semantics, and its
 * children are string-only. It is the equivalent of LemonTag (which is where PolarisBadge is used), not
 * of this notification badge. There is no Polaris primitive for a positioned notification counter, so
 * forcing one here would lose position/dot/count behaviour. Left untouched by design.
 */
interface LemonBadgePropsBase {
    size?: 'xsmall' | 'small' | 'medium' | 'large'
    position?: 'none' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    className?: string
    status?: 'primary' | 'success' | 'warning' | 'danger' | 'muted' | 'data'
    active?: boolean
    style?: React.CSSProperties
    title?: string
}

export interface LemonBadgeProps extends LemonBadgePropsBase {
    content?: string | JSX.Element
    visible?: boolean
}

export interface LemonBadgeNumberProps extends LemonBadgePropsBase {
    count: number
    /** Maximum number of digits shown at once. Default value: 1 (so all numbers above 9 are shown as "9+"). */
    maxDigits?: number
    showZero?: boolean
    /**
     * Whether to force the badge to show a plus with the number e.g. if we know we have the count of a page of values but there are more available
     */
    forcePlus?: boolean
}

/** An icon-sized badge. */
const LemonBadgeComponent: React.FunctionComponent<LemonBadgeProps & React.RefAttributes<HTMLSpanElement>> = forwardRef(
    function LemonBadgeComponent(
        {
            content,
            visible = true,
            size = 'medium',
            position = 'none',
            className,
            status = 'primary',
            active = false,
            ...spanProps
        },
        ref
    ): JSX.Element {
        return (
            <span
                ref={ref}
                className={clsx(
                    'LemonBadge',
                    !content && 'LemonBadge--dot',
                    `LemonBadge--${size}`,
                    `LemonBadge--${status}`,
                    `LemonBadge--position-${position}`,
                    active && 'LemonBadge--active',
                    !visible && 'LemonBadge--hidden',
                    className
                )}
                {...spanProps}
                aria-hidden={!visible ? true : undefined}
            >
                {content}
            </span>
        )
    }
)

/** An icon-sized badge for displaying a count.
 *
 * Numbers up to 9 are displayed in full, in integer form, with 9+ for higher values.
 * JSX elements are rendered outright to support use cases where the badge is meant to show an icon.
 * If `showZero` is set to `true`, the component won't be hidden if the count is 0.
 */
const LemonBadgeNumber: React.FunctionComponent<LemonBadgeNumberProps & React.RefAttributes<HTMLSpanElement>> =
    forwardRef(function LemonBadgeNumber(
        { count, maxDigits = 1, showZero = false, forcePlus = false, ...badgeProps },
        ref
    ): JSX.Element {
        if (maxDigits < 1) {
            throw new Error('maxDigits must be at least 1')
        }

        let text =
            typeof count === 'object'
                ? count
                : typeof count === 'number' && count !== 0
                  ? count < Math.pow(10, maxDigits)
                      ? compactNumber(count)
                      : `${'9'.repeat(maxDigits)}+`
                  : showZero
                    ? '0'
                    : ''

        if (forcePlus && !text.includes('+')) {
            text += '+'
        }

        const hide = count === undefined || (count == 0 && !showZero)

        return (
            <LemonBadge
                ref={ref}
                visible={!hide}
                title={typeof count === 'number' ? humanFriendlyNumber(count) : undefined}
                content={text}
                {...badgeProps}
            />
        )
    })

export const LemonBadge = Object.assign(LemonBadgeComponent, { Number: LemonBadgeNumber })
