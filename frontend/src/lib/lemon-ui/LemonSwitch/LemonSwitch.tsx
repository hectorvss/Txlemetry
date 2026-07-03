import './LemonSwitch.scss'

import clsx from 'clsx'
import { forwardRef, useMemo, useState } from 'react'

import { Spinner } from 'lib/lemon-ui/Spinner'
import { Tooltip } from 'lib/lemon-ui/Tooltip'
import { cn } from 'lib/utils/css-classes'

/**
 * POLARIS MIGRATION NOTE (kept as-is on purpose — do not "finish" this by swapping in a Polaris control):
 *
 * @shopify/polaris v13.9.5 ships NO switch/toggle control. The full component list was checked
 * against the package's own type declarations: the only selection controls are <Checkbox>,
 * <RadioButton> and <ChoiceList>, and the only "toggle"-named component, <SettingToggle>, is a
 * deprecated card-with-a-Button composition (its own .d.ts says "will be removed in v12"), not a
 * switch control. Rendering a Polaris <Checkbox> here was rejected: it would change both the
 * appearance (checkbox box vs. sliding handle, `sliderColorOverrideChecked/Unchecked`, the
 * loading Spinner inside the handle) and the semantics (role="switch" — a switch applies its
 * change immediately, unlike a checkbox in a form).
 *
 * Decision: behaviour and rendering preserved unchanged (same criterion as LemonTabs /
 * LemonSkeleton / LemonLabel). `loading`, `checked`/`onChange`, `disabledReason` tooltip,
 * `bordered` and the `data-ph-capture-attribute-*` passthrough all stay exactly as they were.
 */
export interface LemonSwitchProps {
    className?: string
    onChange?: (newChecked: boolean) => void
    checked: boolean
    label?: string | JSX.Element
    labelClassName?: string
    id?: string
    fullWidth?: boolean
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium'
    bordered?: boolean
    /** @deprecated Checkboxes should never be quietly disabled. Use `disabledReason` to provide an explanation instead. */
    disabled?: boolean
    /** Like plain `disabled`, except we enforce a reason to be shown in the tooltip. */
    disabledReason?: string | null | false
    'data-attr'?: string
    tooltip?: string | JSX.Element | null
    'aria-label'?: string
    sliderColorOverrideChecked?: string
    sliderColorOverrideUnchecked?: string
    loading?: boolean
    /** Forwarded to the switch element so autocapture can read them off the click. Autocapture only fires on the interactive (`onChange`) variant, which renders a button; a read-only switch renders a div and these never reach an autocapture event. */
    [captureAttribute: `data-ph-capture-attribute-${string}`]: string | boolean | undefined
}

/** Counter used for collision-less automatic switch IDs. */
let switchCounter = 0

export const LemonSwitch: React.FunctionComponent<LemonSwitchProps & React.RefAttributes<HTMLDivElement>> = forwardRef(
    function LemonSwitch(
        {
            className,
            id: rawId,
            onChange,
            checked,
            fullWidth,
            bordered,
            size = 'medium',
            disabled,
            disabledReason,
            label,
            labelClassName,
            tooltip,
            'data-attr': dataAttr,
            'aria-label': ariaLabel,
            sliderColorOverrideChecked,
            sliderColorOverrideUnchecked,
            loading = false,
            ...captureAttributes
        },
        ref
    ): JSX.Element {
        const id = useMemo(() => rawId || `lemon-switch-${switchCounter++}`, [rawId])
        const [isActive, setIsActive] = useState(false)

        const conditionalProps: { 'aria-label'?: string } = {}
        if (ariaLabel) {
            conditionalProps['aria-label'] = ariaLabel
        }

        let tooltipContent: JSX.Element | null = null
        if (disabledReason) {
            disabled = true // Support `disabledReason` while maintaining compatibility with `disabled`
            tooltipContent = <span className="italic">{disabledReason}</span>
        } else if (tooltip) {
            tooltipContent = <span>{tooltip}</span>
        }

        // Disable the switch when loading
        const isDisabled = disabled || loading

        const ButtonHtmlComponent = onChange ? 'button' : 'div'

        let buttonComponent = (
            <ButtonHtmlComponent
                id={id}
                className={`LemonSwitch__button ${
                    sliderColorOverrideChecked || sliderColorOverrideUnchecked
                        ? `bg-${checked ? sliderColorOverrideChecked : sliderColorOverrideUnchecked}`
                        : ''
                }`}
                type="button"
                role="switch"
                onClick={() => {
                    if (onChange && !loading) {
                        onChange(!checked)
                    }
                }}
                onMouseDown={() => !loading && setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                onMouseOut={() => setIsActive(false)}
                data-attr={dataAttr}
                disabled={isDisabled}
                {...conditionalProps}
                {...captureAttributes}
            >
                <div className="LemonSwitch__handle">
                    {loading && (
                        <div
                            className={cn(
                                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex pointer-events-none'
                            )}
                        >
                            <Spinner textColored={true} className="LemonSwitch__spinner-icon" />
                        </div>
                    )}
                </div>
            </ButtonHtmlComponent>
        )
        if (tooltipContent) {
            buttonComponent = (
                <Tooltip title={tooltipContent}>
                    {/* wrap it in a div so that the tooltip works even when disabled */}
                    <div className="flex items-center">{buttonComponent}</div>
                </Tooltip>
            )
        }

        return (
            <div
                ref={ref}
                className={clsx('LemonSwitch', className, `LemonSwitch--${size}`, {
                    'LemonSwitch--checked': checked,
                    'LemonSwitch--active': isActive,
                    'LemonSwitch--bordered': bordered,
                    'LemonSwitch--disabled': isDisabled,
                    'LemonSwitch--full-width': fullWidth,
                    'LemonSwitch--loading': loading,
                })}
            >
                {label && (
                    <label htmlFor={id} className={labelClassName}>
                        {label}
                    </label>
                )}
                {buttonComponent}
            </div>
        )
    }
)
