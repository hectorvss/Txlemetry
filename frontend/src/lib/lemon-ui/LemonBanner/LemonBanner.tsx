import './LemonBanner.scss'

import { Banner as PolarisBanner } from '@shopify/polaris'
import clsx from 'clsx'
import { useActions, useValues } from 'kea'

import { IconInfo, IconSparkles, IconWarning, IconX } from '@posthog/icons'

import { LemonButton, SideAction } from 'lib/lemon-ui/LemonButton'
import { LemonButtonPropsBase } from 'lib/lemon-ui/LemonButton'

import { lemonBannerLogic } from './lemonBannerLogic'

export type LemonBannerAction = SideAction & Pick<LemonButtonPropsBase, 'children'>

/**
 * Rendering-only mapping from Lemon's public `type` to Polaris <Banner>'s `tone`.
 * Polaris has no "ai" tone, so we fall back to "info" for it and keep rendering our
 * own `IconSparkles`/gradient treatment via `LemonBanner--ai` CSS + the icon slot below —
 * only the semantic banner chrome (surface, border, dismiss button) is delegated to Polaris.
 */
const POLARIS_TONE_BY_LEMON_TYPE: Record<LemonBannerProps['type'], 'info' | 'success' | 'warning' | 'critical'> = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'critical',
    ai: 'info',
}

export interface LemonBannerProps {
    type: 'info' | 'warning' | 'error' | 'success' | 'ai'
    /** If onClose is provided, a close button will be shown and this callback will be fired when it's clicked. */
    onClose?: () => void
    children: React.ReactNode
    action?: LemonBannerAction
    className?: string
    /** If provided, the banner will be dismissed and hidden when the key is set in localStorage. */
    dismissKey?: string
    /**
     * If left unset, the type-specific icon will show up above a certain width of the banner.
     * If set to a boolean, the icon will either always be hidden or always shown.
     */
    hideIcon?: boolean
    square?: boolean
    icon?: React.ReactNode
}

/** Generic alert message. */
export function LemonBanner({
    type,
    onClose,
    children,
    action,
    className,
    dismissKey = '',
    hideIcon,
    square = false,
    icon,
}: LemonBannerProps): JSX.Element | null {
    const logic = lemonBannerLogic({ dismissKey })
    const { isDismissed } = useValues(logic)
    const { dismiss } = useActions(logic)
    const showCloseButton = dismissKey || onClose

    const _onClose = (): void => {
        if (dismissKey) {
            dismiss()
        }
        onClose?.()
    }

    if (isDismissed) {
        return null
    }

    // LemonBanner's visual chrome is unusually tightly coupled to bespoke CSS —
    // `LemonBanner.scss` drives the `--ai` gradient border via a `::before` pseudo-element
    // anchored on `.LemonBanner`, per-type background/border colors, `@container` queries
    // that swap `action` between a hidden-on-mobile inline slot and a full-width mobile slot,
    // and dedicated Chromatic/Storybook snapshot stories pinned to the current pixel layout.
    // Following the same wrapper pattern as `LemonButton` (legacy class names/CSS kept on an
    // outer element for back-compat, real Polaris component nested inside to own the tone
    // surface), `PolarisBanner` is used here in `hideIcon` mode purely to delegate the
    // tone-driven surface/border chrome — our own icon slot, action buttons and dismiss
    // button (which drives `lemonBannerLogic`'s localStorage dismiss key, unrelated to
    // Polaris's own `onDismiss`) keep rendering exactly as before, unchanged, as its children.
    return (
        <div
            className={clsx(
                'LemonBanner @container',
                `LemonBanner--${type}`,
                className,
                square && 'LemonBanner--square'
            )}
        >
            <PolarisBanner tone={POLARIS_TONE_BY_LEMON_TYPE[type]} hideIcon>
                <div className="flex items-center gap-2 grow @md:!px-1">
                    {!hideIcon &&
                        (icon ? (
                            icon
                        ) : type === 'warning' || type === 'error' ? (
                            <IconWarning
                                className={clsx('LemonBanner__icon', hideIcon !== false && 'hidden @md:!block')}
                            />
                        ) : type === 'ai' ? (
                            <IconSparkles
                                className={clsx('LemonBanner__icon', hideIcon !== false && 'hidden @md:!block')}
                            />
                        ) : (
                            <IconInfo
                                className={clsx('LemonBanner__icon', hideIcon !== false && 'hidden @md:!block')}
                            />
                        ))}
                    <div className="grow overflow-hidden">{children}</div>
                    {action && <LemonButton className="!hidden @md:!flex" type="secondary" {...action} />}
                    {showCloseButton && (
                        <LemonButton size="xsmall" icon={<IconX />} onClick={_onClose} aria-label="close" />
                    )}
                </div>
                {action && <LemonButton className="@md:!hidden" type="secondary" fullWidth {...action} />}
            </PolarisBanner>
        </div>
    )
}
