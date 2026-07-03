import { RadioButton as PolarisRadioButton } from '@shopify/polaris'
import clsx from 'clsx'

import { Tooltip } from 'lib/lemon-ui/Tooltip'

/**
 * POLARIS MIGRATION NOTE: each option's radio control (the circle input + its label) is now
 * rendered by a real Polaris <RadioButton>. The public LemonRadio API (group `value`/`onChange`,
 * `options`, `orientation`, `radioPosition`, `className`) is unchanged.
 *
 * Mapping to Polaris <RadioButton> props (all present in @shopify/polaris v13.9.5
 * RadioButton.d.ts):
 *   - `label: React.ReactNode` accepts our option `label` (string | JSX.Element) 1:1 — this is
 *     why RadioButton (individual) is used rather than <ChoiceList>, whose `Choice.label` is also
 *     ReactNode but whose grouping/selection model (`selected: string[]`, string values only)
 *     would force a lossy value round-trip through `String(value)` and break the `T extends
 *     React.Key` contract. RadioButton keeps each option independent and ReactNode-flexible.
 *   - `helpText: React.ReactNode` renders our optional `description` 1:1.
 *   - `checked: boolean` = `value === selectedValue`.
 *   - `disabled: boolean` = `!!disabledReason` (same as the old `<input disabled>`).
 *   - `onChange?(newValue: boolean, id: string)` — Polaris fires this only when the radio becomes
 *     selected, so we ignore its args and call the group's `onChange(value)` with the original
 *     typed `T` value (Polaris only speaks strings). Guarded by `disabledReason` exactly as before.
 *   - `id` is a stable per-option id so the inner <label>/<input> association Polaris builds is
 *     correct; `value={String(value)}` mirrors the previous `<input value>`.
 *   - `disabledReason` (tooltip) and per-option `data-attr`/`aria-label` are NOT accepted by
 *     Polaris RadioButton, so they stay wrapper-level concerns: the Tooltip and the `data-attr`/
 *     `aria-label` on the surrounding <label> are preserved verbatim from the old implementation.
 *
 * The legacy grid/flex layout classes (`grid-cols-[min-content_auto]`, `radioPosition`,
 * `orientation`) are kept on the wrapper so external CSS/selectors and spacing are untouched;
 * `labelHidden` is never used because we always render Polaris's own label.
 */
export interface LemonRadioOption<T extends React.Key> {
    label: string | JSX.Element
    description?: string | JSX.Element
    value: T
    disabledReason?: string
    'data-attr'?: string
    'aria-label'?: string
}

export interface LemonRadioProps<T extends React.Key> {
    value?: T
    onChange: (newValue: T) => void
    options: LemonRadioOption<T>[]
    className?: string
    radioPosition?: 'center' | 'top'
    orientation?: 'vertical' | 'horizontal'
}

/** Single choice radio. */
export function LemonRadio<T extends React.Key>({
    value: selectedValue,
    onChange,
    options,
    className,
    radioPosition,
    orientation = 'vertical',
}: LemonRadioProps<T>): JSX.Element {
    return (
        <div
            className={clsx(
                'flex font-medium',
                orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4',
                className
            )}
        >
            {options.map(({ value, label, disabledReason, description, ...optionProps }) => {
                const content = (
                    <label
                        key={value}
                        className={clsx(
                            'grid items-center gap-x-2 text-sm',
                            disabledReason ? 'text-secondary cursor-not-allowed' : 'cursor-pointer',
                            {
                                'items-baseline': radioPosition === 'top',
                                'items-center': radioPosition === 'center' || !radioPosition,
                            }
                        )}
                        // per-option `data-attr`/`aria-label` — Polaris RadioButton doesn't accept
                        // them, so they live on the wrapper exactly as the old <input> siblings did.
                        {...optionProps}
                    >
                        <PolarisRadioButton
                            id={`lemon-radio-${String(value)}`}
                            label={label}
                            helpText={description}
                            value={String(value)}
                            checked={value === selectedValue}
                            disabled={!!disabledReason}
                            onChange={() => {
                                if (!disabledReason) {
                                    onChange(value)
                                }
                            }}
                        />
                    </label>
                )

                if (disabledReason) {
                    return (
                        <Tooltip key={value} title={disabledReason}>
                            {content}
                        </Tooltip>
                    )
                }
                return content
            })}
        </div>
    )
}
