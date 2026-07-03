import './LemonCheckbox.scss'

import { Checkbox as PolarisCheckbox } from '@shopify/polaris'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { IconInfo } from '@posthog/icons'

import { Tooltip } from '../Tooltip'

/**
 * POLARIS MIGRATION NOTE: the checkbox control itself (box, tick/minus icon, inner <label>) is
 * now rendered by the real Polaris <Checkbox>. The public LemonCheckbox API is unchanged.
 *
 * Mapping to Polaris props (all present in @shopify/polaris v13.9.5 Checkbox.d.ts):
 *   - `checked: boolean | 'indeterminate'` maps 1:1 (`checked?: boolean | 'indeterminate'`).
 *   - `label`/`info` are composed into Polaris's `label: React.ReactNode` (info keeps its Tooltip
 *     + IconInfo rendering); when neither is set, `labelHidden` avoids empty-label spacing.
 *   - `id`, `disabled`, `labelClassName` map 1:1.
 *   - `onChange` is NOT wired through Polaris's `onChange?(newChecked: boolean, id: string)`,
 *     because Lemon's signature is `(value: boolean, event: ChangeEvent<HTMLInputElement>)` and
 *     callers depend on the real event (e.g. LemonTable bulk selection reads
 *     `event.nativeEvent.shiftKey` for shift-click range selection). Instead, the change event
 *     that bubbles up from Polaris's inner <input> is captured on the legacy wrapper <span>,
 *     which preserves the exact event object of the old implementation.
 *   - `defaultChecked` (absent in Polaris) keeps working via the pre-existing `localChecked`
 *     state, which also drives the legacy `LemonCheckbox--checked` class.
 *   - `bordered`, `fullWidth`, `size` and the deprecated `color` stay wrapper-level concerns
 *     (legacy `LemonCheckbox--*` classes / `--box-color` variable), same approach as LemonButton.
 */
export interface LemonCheckboxProps {
    checked?: boolean | 'indeterminate'
    defaultChecked?: boolean
    /** @deprecated Checkboxes should never be quietly disabled. Use `disabledReason` to provide an explanation instead. */
    disabled?: boolean
    /** Like plain `disabled`, except we enforce a reason to be shown in the tooltip. */
    disabledReason?: string | null | false
    onChange?: (value: boolean, event: ChangeEvent<HTMLInputElement>) => void
    label?: string | JSX.Element
    /** Tooltip shown next to the label with an info icon. */
    info?: React.ReactNode
    id?: string
    className?: string
    labelClassName?: string
    fullWidth?: boolean
    size?: 'xsmall' | 'small' | 'medium'
    bordered?: boolean
    /** @deprecated See https://github.com/Txlemetry/posthog/pull/9357#pullrequestreview-933783868. */
    color?: string
    'data-attr'?: string
    /** Whether to stop propagation of events from the input */
    stopPropagation?: boolean
}

export interface BoxCSSProperties extends React.CSSProperties {
    '--box-color': string
}

/** Counter used for collision-less automatic checkbox IDs. */
let checkboxCounter = 0

/**
 * As opposed to switches, checkboxes don't always have to result in the change being applied immediately.
 * E.g. the change may only be applied when the user clicks "Save" in a form.
 */
export function LemonCheckbox({
    checked,
    defaultChecked,
    disabled,
    disabledReason,
    onChange,
    label,
    info,
    id: rawId,
    className,
    labelClassName,
    fullWidth,
    bordered,
    color,
    size,
    'data-attr': dataAttr,
    stopPropagation,
}: LemonCheckboxProps): JSX.Element {
    const indeterminate = checked === 'indeterminate'
    disabled = disabled || !!disabledReason

    const id = useMemo(() => rawId || `lemon-checkbox-${checkboxCounter++}`, [rawId])
    const [localChecked, setLocalChecked] = useState(indeterminate || (checked ?? defaultChecked ?? false))
    const [wasIndeterminateLast, setWasIndeterminateLast] = useState(false)

    useEffect(() => {
        if (checked !== undefined) {
            setLocalChecked(!!checked)
        }
    }, [checked])

    useEffect(() => {
        if (checked) {
            setWasIndeterminateLast(indeterminate)
        }
    }, [checked, indeterminate])

    // Prevent text selection when clicking on the area between the checkbox and the label
    const stopShiftSelection = (e: React.MouseEvent): void => {
        if (e.shiftKey && e.button === 0) {
            e.preventDefault()
        }
    }

    // Same composition as before the Polaris migration: the label text plus the optional
    // `info` tooltip icon, passed as Polaris <Checkbox>'s `label` (a React.ReactNode).
    const composedLabel: React.ReactNode =
        label || info ? (
            <>
                {label && <span className="LemonCheckbox__label">{label}</span>}
                {info && (
                    <Tooltip title={info}>
                        <IconInfo className="text-xl text-secondary shrink-0 ml-0.5" />
                    </Tooltip>
                )}
            </>
        ) : (
            ''
        )

    return (
        <Tooltip title={disabledReason ? <i>{disabledReason}</i> : null} placement="top-start">
            <span
                className={clsx(
                    'LemonCheckbox',
                    localChecked && 'LemonCheckbox--checked',
                    wasIndeterminateLast && 'LemonCheckbox--indeterminate',
                    bordered && 'LemonCheckbox--bordered',
                    disabled && 'LemonCheckbox--disabled',
                    fullWidth && 'LemonCheckbox--full-width',
                    size && `LemonCheckbox--${size}`,
                    className
                )}
                data-attr={dataAttr}
                /* eslint-disable-next-line react/forbid-dom-props */
                style={color ? ({ '--box-color': color } as BoxCSSProperties) : undefined}
                onMouseDownCapture={stopShiftSelection}
                onClick={(e) => {
                    if (stopPropagation) {
                        e.stopPropagation()
                    }
                }}
                onChange={(e) => {
                    // Change events from Polaris's inner <input type="checkbox"> bubble up here.
                    // Polaris passes `onChange: noop` to that input, so this is the only change
                    // handler — no double invocation. Capturing the event at this level (rather
                    // than using Polaris's `onChange(newChecked, id)` callback) preserves Lemon's
                    // `(value, event)` signature with the genuine ChangeEvent, incl. nativeEvent.
                    const event = e as unknown as ChangeEvent<HTMLInputElement>
                    if (event.target.type !== 'checkbox') {
                        return // Not from the checkbox input (e.g. an input rendered inside `label`)
                    }
                    // NOTE: We only want to setLocalChecked if the component is not controlled externally
                    checked === undefined && setLocalChecked(event.target.checked)
                    onChange?.(event.target.checked, event)
                }}
            >
                <PolarisCheckbox
                    id={id}
                    label={composedLabel}
                    labelHidden={!label && !info}
                    labelClassName={labelClassName}
                    checked={indeterminate ? 'indeterminate' : localChecked}
                    disabled={disabled}
                />
            </span>
        </Tooltip>
    )
}
