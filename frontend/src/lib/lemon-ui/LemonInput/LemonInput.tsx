import './LemonInput.scss'

import { useMergeRefs } from '@floating-ui/react'
import clsx from 'clsx'
import React, { useRef, useState } from 'react'

import { IconEye, IconSearch, IconX } from '@posthog/icons'
import { Tooltip } from '@posthog/lemon-ui'

import { IconEyeHidden } from 'lib/lemon-ui/icons'
import { LemonButton } from 'lib/lemon-ui/LemonButton'
import { LemonTag } from 'lib/lemon-ui/LemonTag'

import { RawInputAutosize } from './RawInputAutosize'

interface LemonInputPropsBase extends Pick<
    // NOTE: We explicitly pick rather than omit to ensure these components aren't used incorrectly
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'className'
    | 'onClick'
    | 'onFocus'
    | 'onBlur'
    | 'autoFocus'
    | 'maxLength'
    | 'onKeyDown'
    | 'onKeyUp'
    | 'onKeyPress'
    | 'onPaste'
    | 'autoComplete'
    | 'autoCorrect'
    | 'autoCapitalize'
    | 'spellCheck'
    | 'inputMode'
    | 'pattern'
> {
    inputRef?: React.Ref<HTMLInputElement>
    id?: string
    placeholder?: string
    /** Use the danger status for invalid input. */
    status?: 'default' | 'danger'
    /** Whether there should be a clear icon to the right allowing you to reset the input. The `suffix` prop will be ignored if clearing is allowed. */
    allowClear?: boolean
    /** Element to prefix input field */
    prefix?: React.ReactElement | null
    /** Element to suffix input field */
    suffix?: React.ReactElement | null
    /** @deprecated Use `disabledReason` instead and provide a reason. */
    disabled?: boolean
    /** Like plain `disabled`, except we enforce a reason to be shown in the tooltip. */
    disabledReason?: React.ReactNode | null | false
    /** Whether the disabled reason tooltip is interactive (e.g., contains a link) */
    disabledReasonInteractive?: boolean
    /** Whether input field is full width. Cannot be used in conjuction with `autoWidth`. */
    fullWidth?: boolean
    /** Whether input field should be as wide as its content. Cannot be used in conjuction with `fullWidth`. */
    autoWidth?: boolean
    /** Special case - show a transparent background rather than white */
    transparentBackground?: boolean
    /** Size of the element. Default: `'medium'`. */
    size?: 'xsmall' | 'small' | 'medium' | 'large'
    onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void
    'data-attr'?: string
    'aria-label'?: string
    /** Whether to stop propagation of events from the input */
    stopPropagation?: boolean
    /** Small label shown above the top-right corner, e.g. "last used" */
    badgeText?: string
}

export interface LemonInputPropsText extends LemonInputPropsBase {
    type?: 'text' | 'email' | 'search' | 'url' | 'password' | 'time'
    value?: string
    defaultValue?: string
    onChange?: (newValue: string) => void
    /** Seconds between valid values; mainly for `type="time"` (passed to native `<input>`). */
    step?: number
}

export interface LemonInputPropsNumber
    extends LemonInputPropsBase, Pick<React.InputHTMLAttributes<HTMLInputElement>, 'step' | 'min' | 'max'> {
    type: 'number'
    value?: number
    defaultValue?: number
    onChange?: (newValue: number | undefined) => void
}

export type LemonInputProps = LemonInputPropsText | LemonInputPropsNumber

// Delay for interactive tooltips to close after mouse leave.
// This allows some grace period in case the user moves the
// cursor out of the tooltip briefly while intending to
// interact with it.
export const INTERACTIVE_CLOSE_DELAY_MS = 750

/**
 * Polaris migration note (option b — visual adoption, not component swap):
 * Polaris <TextField> cannot express this component's public contract — it doesn't forward a ref
 * to the native <input> (`inputRef` is relied on by 20+ consumers for focus/selection control),
 * exposes no `onKeyDown`/`onKeyUp`/`onKeyPress`/`onPaste`/`onClick` native-event props
 * (`onPressEnter` alone has 50+ consumers), doesn't accept arbitrary attributes such as
 * `data-attr` on the input, has no uncontrolled `defaultValue` mode, no `valueAsNumber`-based
 * number handling, and no equivalent of `autoWidth` (RawInputAutosize) or `badgeText`.
 * We therefore keep the native implementation (zero contract regressions) and adopt Polaris'
 * real `Polaris-TextField*` class structure for the visual chrome: the classes below activate
 * @shopify/polaris' global stylesheet (loaded in Fase 0), and LemonInput.scss contains
 * deterministic (higher-specificity) reconciliation rules so the result doesn't depend on
 * CSS import order. Geometry (heights/paddings/gap) intentionally stays Lemon to avoid layout
 * shifts across the ~500 usages; colors, border, radius and focus ring are Polaris.
 */

export const LemonInput = React.forwardRef<HTMLDivElement, LemonInputProps>(function LemonInput(
    {
        className,
        onChange,
        onFocus,
        onBlur,
        onPressEnter,
        status = 'default',
        allowClear, // Default handled inside the component
        fullWidth,
        autoWidth,
        prefix,
        suffix,
        type,
        value,
        transparentBackground = false,
        size = 'medium',
        stopPropagation = false,
        inputRef,
        disabled,
        disabledReason,
        disabledReasonInteractive,
        badgeText,
        ...props
    },
    ref
): JSX.Element {
    const internalInputRef = useRef<HTMLInputElement>(null)
    const mergedInputRef = useMergeRefs([inputRef, internalInputRef])

    const [focused, setFocused] = useState<boolean>(Boolean(props.autoFocus))
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

    if (autoWidth && fullWidth) {
        throw new Error('Cannot use `autoWidth` and `fullWidth` props together')
    }

    const focus = (): void => {
        internalInputRef.current?.focus()
        setFocused(true)
    }

    if (type === 'search') {
        allowClear = allowClear ?? true
        prefix = prefix ?? <IconSearch />
    } else if (type === 'password') {
        const showPasswordButton = (
            <LemonButton
                size="small"
                noPadding
                icon={passwordVisible ? <IconEyeHidden /> : <IconEye />}
                tooltip={passwordVisible ? 'Hide password' : 'Show password'}
                onClick={(e) => {
                    e.stopPropagation()
                    focus()
                    setPasswordVisible(!passwordVisible)
                }}
            />
        )
        if (suffix) {
            suffix = (
                <>
                    {showPasswordButton}
                    {suffix}
                </>
            )
        } else {
            suffix = showPasswordButton
        }
    }
    // when allowClear is set with a value, render a clear button alongside any
    // existing suffix so consumers (e.g. TaxonomicFilter's category dropdown)
    // remain reachable while the user is typing
    if (allowClear && value) {
        const clearButton = (
            <LemonButton
                size="small"
                noPadding
                icon={<IconX />}
                tooltip="Clear input"
                onClick={(e) => {
                    if (stopPropagation) {
                        e.stopPropagation()
                    }
                    if (onChange) {
                        if (type === 'number') {
                            // @ts-expect-error - onChange is typed as never, force it to match the right one
                            onChange(0)
                        } else {
                            // @ts-expect-error - onChange is typed as never, force it to match the right one
                            onChange('')
                        }
                    }

                    focus()
                }}
            />
        )
        suffix = suffix ? (
            <>
                {suffix}
                {clearButton}
            </>
        ) : (
            clearButton
        )
    }

    const InputComponent = autoWidth ? RawInputAutosize : 'input'
    return (
        <Tooltip
            title={disabledReason ?? undefined}
            interactive={disabledReasonInteractive}
            closeDelayMs={disabledReasonInteractive ? INTERACTIVE_CLOSE_DELAY_MS : undefined}
        >
            <span
                className={clsx(
                    'LemonInput',
                    'input-like',
                    // Real Polaris TextField classes (see the Polaris migration note above): they
                    // activate Polaris' stylesheet; LemonInput.scss reconciles the conflicts.
                    'Polaris-TextField',
                    status !== 'default' && `LemonInput--status-${status}`,
                    status === 'danger' && 'Polaris-TextField--error',
                    type && `LemonInput--type-${type}`,
                    size && `LemonInput--${size}`,
                    (size === 'xsmall' || size === 'small') && 'Polaris-TextField--slim',
                    fullWidth && 'LemonInput--full-width',
                    value && 'LemonInput--has-content',
                    value && 'Polaris-TextField--hasValue',
                    !disabled && !disabledReason && focused && 'LemonInput--focused',
                    !disabled && !disabledReason && focused && 'Polaris-TextField--focus',
                    (disabled || !!disabledReason) && 'Polaris-TextField--disabled',
                    transparentBackground && 'LemonInput--transparent-background',
                    badgeText && 'relative',
                    className
                )}
                aria-disabled={disabled || !!disabledReason}
                onClick={() => focus()}
                ref={ref}
            >
                {prefix ? <span className="Polaris-TextField__Prefix">{prefix}</span> : null}
                <InputComponent
                    className="LemonInput__input Polaris-TextField__Input"
                    ref={mergedInputRef}
                    type={(type === 'password' && passwordVisible ? 'text' : type) || 'text'}
                    value={value}
                    disabled={disabled || !!disabledReason}
                    onChange={(event) => {
                        if (stopPropagation) {
                            event.stopPropagation()
                        }

                        if (onChange) {
                            if (type === 'number') {
                                // @ts-expect-error - onChange is typed as never, force it to match the right one
                                onChange(event.currentTarget.valueAsNumber)
                            } else {
                                // @ts-expect-error - onChange is typed as never, force it to match the right one
                                onChange(event.currentTarget.value ?? '')
                            }
                        }
                    }}
                    onFocus={(event) => {
                        if (stopPropagation) {
                            event.stopPropagation()
                        }
                        setFocused(true)
                        onFocus?.(event)
                    }}
                    onBlur={(event) => {
                        if (stopPropagation) {
                            event.stopPropagation()
                        }
                        setFocused(false)
                        onBlur?.(event)
                    }}
                    onKeyDown={(event) => {
                        if (stopPropagation) {
                            event.stopPropagation()
                        }
                        if (onPressEnter && event.key === 'Enter' && !event.nativeEvent.isComposing) {
                            onPressEnter(event)
                        }
                    }}
                    {...props}
                />
                {suffix ? <span className="Polaris-TextField__Suffix">{suffix}</span> : null}
                {badgeText && (
                    <LemonTag className="absolute -top-3 -right-2 pointer-events-none" size="small" type="muted">
                        {badgeText}
                    </LemonTag>
                )}
            </span>
        </Tooltip>
    )
})
