import './LemonDivider.scss'

import { Divider as PolarisDivider } from '@shopify/polaris'

import { cn } from 'lib/utils/css-classes'

export interface LemonDividerProps {
    /** 3x the thickness of the line. */
    thick?: boolean
    /** Whether the divider should be vertical (for separating left-to-right) instead of horizontal (top-to-bottom). */
    vertical?: boolean
    /** Whether the divider should be a dashed line. */
    dashed?: boolean
    /** Adding a className will remove the default margin class names, allowing the greatest flexibility */
    className?: string
    /** A label to display within the divider */
    label?: string | React.ReactElement
}

/** A line separator for separating rows of content
 *
 * Horizontal by default but can be used in vertical form too.
 * Default padding is `m-2` (e.g. 0.5rem) and can be overridden with `className`
 */
export function LemonDivider({
    vertical = false,
    dashed = false,
    thick = false,
    label,
    className,
}: LemonDividerProps): JSX.Element {
    // Polaris <Divider> only draws a plain horizontal rule (configurable border color/width).
    // It has no vertical, dashed, 3px-thick or labelled mode, so only the plain horizontal
    // variant is delegated to the real Polaris component. The wrapper keeps the legacy
    // `LemonDivider` class (plus default margins and `role="separator"`) for back-compat;
    // the `--polaris` modifier neutralises the legacy line so it isn't drawn twice.
    if (!vertical && !dashed && !thick && !label) {
        return (
            <div
                className={cn(
                    'LemonDivider LemonDivider--polaris',
                    // If no className is provided we set some sensible default margins
                    !className && 'my-2',
                    className
                )}
                role="separator"
            >
                <PolarisDivider borderColor="border" />
            </div>
        )
    }
    return (
        <div
            className={cn(
                'LemonDivider',
                vertical && 'LemonDivider--vertical',
                thick && 'LemonDivider--thick',
                dashed && 'LemonDivider--dashed',
                !!label && 'LemonDivider--with-label',
                // If no className is provided we set some sensible default margins
                !className && (vertical ? 'm-2' : 'my-2'),
                className
            )}
            role="separator"
        >
            {label && <div className="px-3 text-xs whitespace-nowrap font-semibold">{label}</div>}
        </div>
    )
}
