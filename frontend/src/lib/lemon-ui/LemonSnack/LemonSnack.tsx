import { Tag as PolarisTag } from '@shopify/polaris'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { IconX } from '@posthog/icons'
// eslint-disable-next-line import/no-cycle
import { LemonButton } from '@posthog/lemon-ui'

/**
 * POLARIS MIGRATION NOTE (fiabilidad sobre pureza — do not "finish" this by forcing every path
 * through Polaris <Tag>):
 *
 * Polaris v13 <Tag> (Tag/Tag.d.ts) is a descartable chip with:
 *   children?: React.ReactNode; disabled?: boolean; onRemove?(): void; onClick?(): void;
 *   url?: string; accessibilityLabel?: string; size?: 'large'.
 * CRUCIAL: its TagProps type is a union where `onClick` and `onRemove` are MUTUALLY EXCLUSIVE —
 * when `onClick` is set the chip renders WITHOUT the remove button/url. LemonSnack must support
 * both at once (e.g. ValueSnacks in LemonInputSelect passes `onClose` AND `onClick` together to
 * make a snack whose body edits and whose X removes). Polaris <Tag> physically cannot express that.
 *
 * So we render a real Polaris <Tag> ONLY on the clean descartable path (regular type, no onClick,
 * no wrap, no extra HTML span attrs) — the common `children + onClose` case. Every richer case
 * (simultaneous onClick+onClose, `pill` type, `wrap`, spread trigger handlers from Tooltip, etc.)
 * keeps the original reliable span implementation. onClose maps to onRemove; children stay ReactNode
 * (Tag's children is already ReactNode, no string cast needed); `data-attr`/title pass through the
 * wrapping span so callers and tests see no API change.
 */

export interface LemonSnackProps extends React.HTMLAttributes<HTMLSpanElement> {
    type?: 'regular' | 'pill'
    children?: React.ReactNode
    onClick?: React.MouseEventHandler
    onClose?: React.MouseEventHandler
    title?: string
    wrap?: boolean
    className?: string
    'data-attr'?: string
}

export const LemonSnack: React.FunctionComponent<LemonSnackProps & React.RefAttributes<HTMLSpanElement>> = forwardRef(
    function LemonSnack(
        { type = 'regular', children, wrap, onClick, onClose, title, className, ...rest },
        ref
    ): JSX.Element {
        const isRegular = type === 'regular'
        const isClickable = !!onClick

        // Clean descartable path → real Polaris <Tag>. Only when the case maps 1:1 to Polaris's
        // mutually-exclusive onClick/onRemove union and there are no extra HTML span attrs to spread
        // (which the Tooltip wrapper injects and Polaris <Tag> wouldn't forward). Wrapped in a span so
        // `data-attr`, `title`, `className` and refs keep working exactly as before (no API change).
        const canUsePolarisTag = isRegular && !isClickable && !wrap && Object.keys(rest).length === 0
        if (canUsePolarisTag) {
            return (
                <span
                    ref={ref}
                    className={twMerge('LemonSnack inline-flex max-w-full overflow-hidden', className)}
                    title={title ?? (typeof children === 'string' ? children : undefined)}
                >
                    <PolarisTag
                        onRemove={
                            onClose
                                ? () =>
                                      // Polaris's onRemove passes no event, but the original onClose
                                      // signature is a MouseEventHandler and some callers call
                                      // e.stopPropagation(). Pass a minimal event-shaped stub with
                                      // no-op propagation methods so those callers never throw.
                                      onClose({
                                          stopPropagation: () => {},
                                          preventDefault: () => {},
                                      } as unknown as React.MouseEvent)
                                : undefined
                        }
                    >
                        {/* Tag's children is ReactNode in v13 (Tag/Tag.d.ts), so no string cast needed. */}
                        {children}
                    </PolarisTag>
                </span>
            )
        }

        return (
            <span
                // Spread first so wrappers like Tooltip can attach their trigger
                // handlers; the explicit props below take precedence.
                {...rest}
                ref={ref}
                className={twMerge(
                    'inline-flex text-primary-alt max-w-full overflow-hidden break-all items-center py-1 leading-5',
                    !wrap && 'whitespace-nowrap',
                    isRegular
                        ? 'bg-accent-highlight-secondary px-1.5 rounded'
                        : 'bg-primary-alt-highlight px-4 rounded-full h-8',
                    isClickable && 'cursor-pointer',
                    className
                )}
                onClick={onClick}
            >
                <span
                    className="overflow-hidden text-ellipsis"
                    title={title ?? (typeof children === 'string' ? children : undefined)}
                >
                    {children}
                </span>

                {onClose && (
                    <span className={clsx('LemonSnack__close shrink-0 ml-1', isRegular || '-mr-1')}>
                        <LemonButton
                            size="small"
                            noPadding
                            icon={<IconX />}
                            onClick={(e) => {
                                e.stopPropagation()
                                onClose(e)
                            }}
                        />
                    </span>
                )}
            </span>
        )
    }
)
