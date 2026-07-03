import './LemonButton.scss'

import { Button as PolarisButton } from '@shopify/polaris'
import clsx from 'clsx'
import React, { useContext } from 'react'

import { IconChevronDown, IconChevronRight, IconExternal } from '@posthog/icons'

import { LemonDropdown, LemonDropdownProps } from '../LemonDropdown'
import { INTERACTIVE_CLOSE_DELAY_MS } from '../LemonInput/LemonInput'
import { Link } from '../Link'
import { PopoverOverlayContext, PopoverReferenceContext } from '../Popover'
import { Spinner } from '../Spinner/Spinner'
import { Tooltip, TooltipProps } from '../Tooltip'

/**
 * Rendering-only mapping from Lemon's public button props to Polaris <Button>'s.
 * Kept isolated from the surrounding composition logic (tooltip/dropdown/side-action/
 * Link-routing) so that behaviour above this line is untouched — only the visual
 * "chrome" for plain (non-link) buttons is delegated to a real Polaris component.
 */
const POLARIS_SIZE_BY_LEMON_SIZE: Record<NonNullable<LemonButtonProps['size']>, 'micro' | 'slim' | 'medium' | 'large'> = {
    xxsmall: 'micro',
    xsmall: 'micro',
    small: 'slim',
    medium: 'medium',
    large: 'large',
}

export type LemonButtonDropdown = Omit<LemonDropdownProps, 'children'>

export interface LemonButtonPropsBase
    // NOTE: We explicitly pick rather than omit to ensure these components aren't used incorrectly
    extends Pick<
        React.ButtonHTMLAttributes<HTMLElement>,
        | 'title'
        | 'onClick'
        | 'id'
        | 'tabIndex'
        | 'form'
        | 'onMouseDown'
        | 'onMouseUp'
        | 'onMouseEnter'
        | 'onMouseLeave'
        | 'onKeyDown'
        | 'className'
        | 'style'
        | 'role'
        | 'aria-haspopup'
    > {
    children?: React.ReactNode
    type?: 'primary' | 'secondary' | 'tertiary'
    /** Button color scheme. */
    status?: 'default' | 'alt' | 'danger'
    /** Whether hover style should be applied, signaling that the button is held active in some way. */
    active?: boolean
    /** URL to link to. */
    to?: string
    /** force the "to" link to reload the page */
    disableClientSideRouting?: boolean
    /** If set clicking this button will open the page in a new tab. */
    targetBlank?: boolean
    /** Disable automatically displaying an external link icon when targetBlank is set */
    hideExternalLinkIcon?: boolean

    /** Icon displayed on the left. */
    icon?: React.ReactElement | null
    /**
     * Icon displayed on the right.
     * If the button opens a dropdown, this icon will be a dropdown arrow by default. Set `sideIcon={null}` to disable.
     */
    sideIcon?: React.ReactElement | null
    htmlType?: 'button' | 'submit' | 'reset'
    loading?: boolean
    /** Tooltip to display on hover. */
    tooltip?: TooltipProps['title']
    /** Documentation link to show in the tooltip. */
    tooltipDocLink?: string
    tooltipPlacement?: TooltipProps['placement']
    /** Whether the row should take up the parent's full width. */
    fullWidth?: boolean
    center?: boolean
    /** @deprecated Buttons should never be quietly disabled. Use `disabledReason` to provide an explanation instead. */
    disabled?: boolean
    /** Like plain `disabled`, except we enforce a reason to be shown in the tooltip. */
    disabledReason?: React.ReactElement | string | null | false
    /** Whether the disabled reason tooltip is interactive (e.g., contains a link) */
    disabledReasonInteractive?: boolean
    noPadding?: boolean
    size?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'
    'data-attr'?: string
    /**
     * Optional stable id for autocapture / action matching when the project includes `data-attr-id` in
     * **Project settings → Data attributes**. Defaults to the same value as `data-attr` when omitted.
     */
    'data-attr-id'?: string
    'aria-label'?: string
    /** Whether to truncate the button's text if necessary */
    truncate?: boolean
    /** Prevent dialog from closing when clicked */
    preventClosing?: boolean
    /** Wrap the main button element with a container element */
    buttonWrapper?: (button: JSX.Element) => JSX.Element
    /** Static offset (px) to adjust tooltip arrow position. Should only be used with fixed tooltipPlacement */
    tooltipArrowOffset?: number
    /** Whether to force the tooltip to be visible. */
    tooltipForceMount?: boolean
    /** Whether to stop event propagation on click */
    stopPropagation?: boolean
}

export type SideAction = Pick<
    LemonButtonProps,
    | 'id'
    | 'onClick'
    | 'to'
    | 'loading'
    | 'disableClientSideRouting'
    | 'disabled'
    | 'disabledReason'
    | 'icon'
    | 'type'
    | 'tooltip'
    | 'tooltipPlacement'
    | 'data-attr'
    | 'data-attr-id'
    | 'aria-label'
    | 'status'
    | 'targetBlank'
    | 'size'
> & {
    dropdown?: LemonButtonDropdown
    /**
     * Whether to show a divider between button contents and side action.
     * @default true // for non-full-width buttons
     * @default false // for full-width buttons
     */
    divider?: boolean
}

export interface LemonButtonWithoutSideActionProps extends LemonButtonPropsBase {
    sideIcon?: React.ReactElement | null
    sideAction?: null
}

/** A LemonButtonWithSideAction can't have a sideIcon - instead it has a clickable sideAction. */
export interface LemonButtonWithSideActionProps extends LemonButtonPropsBase {
    sideAction?: SideAction
    sideIcon?: null
}

export type LemonButtonProps = LemonButtonWithoutSideActionProps | LemonButtonWithSideActionProps

/** Styled button. */
export const LemonButton: React.FunctionComponent<LemonButtonProps & React.RefAttributes<HTMLButtonElement>> =
    React.forwardRef(
        (
            {
                children,
                active = false,
                className,
                disabled,
                disabledReason,
                disabledReasonInteractive,
                loading,
                type = 'tertiary',
                status = 'default',
                icon,
                sideIcon,
                sideAction,
                fullWidth,
                center,
                size,
                tooltip,
                tooltipPlacement,
                tooltipArrowOffset,
                htmlType = 'button',
                noPadding,
                to,
                targetBlank,
                hideExternalLinkIcon,
                disableClientSideRouting,
                onClick,
                truncate = false,
                buttonWrapper,
                tooltipDocLink,
                tooltipForceMount,
                stopPropagation,
                ...buttonProps
            },
            ref
        ): JSX.Element => {
            const [popoverVisibility, popoverPlacement] = useContext(PopoverReferenceContext) || [false, null]
            const [, parentPopoverLevel] = useContext(PopoverOverlayContext)
            const within3000PageHeader = useContext(WithinPageHeaderContext)

            if (!active && popoverVisibility) {
                active = true
            }

            const usingSideActionDivider = sideAction && (sideAction.divider ?? !fullWidth)
            if (sideAction) {
                // Bogus `sideIcon` div prevents overflow under the side button.
                sideIcon = (
                    <span
                        className={clsx(
                            'LemonButtonWithSideAction__spacer',
                            usingSideActionDivider && 'LemonButtonWithSideAction__spacer--divider'
                        )}
                    />
                )
            } else if (popoverPlacement) {
                if (!children) {
                    if (icon === undefined) {
                        icon = popoverPlacement.startsWith('right') ? <IconChevronRight /> : <IconChevronDown />
                    }
                } else if (sideIcon === undefined) {
                    sideIcon = popoverPlacement.startsWith('right') ? <IconChevronRight /> : <IconChevronDown />
                }
            }
            if (loading) {
                // When rendering through Polaris (plain buttons, no `to`), Polaris's own
                // `loading` prop draws its native spinner — don't also force our own icon-spinner
                // in that case, to avoid stacking two spinners. Link-rendered buttons still need it.
                if (to) {
                    icon = <Spinner textColored />
                }
                disabled = true // Cannot interact with a loading button
            }
            if (within3000PageHeader && parentPopoverLevel === -1) {
                size = 'small' // Ensure that buttons in the page header are small (but NOT inside dropdowns!)
            }

            let tooltipContent: TooltipProps['title']
            if (disabledReason) {
                disabled = true // Support `disabledReason` while maintaining compatibility with `disabled`
                if (tooltip) {
                    tooltipContent = (
                        <>
                            {tooltip}
                            <div className="mt-1 italic">{disabledReason}</div>
                        </>
                    )
                } else {
                    tooltipContent = <span className="italic">{disabledReason}</span>
                }
            } else {
                tooltipContent = tooltip
            }

            const legacyClassName = clsx(
                `LemonButton LemonButton--${type} LemonButton--status-${status}`,
                loading && `LemonButton--loading`,
                noPadding && `LemonButton--no-padding`,
                size && `LemonButton--${size}`,
                active && 'LemonButton--active',
                fullWidth && 'LemonButton--full-width',
                center && 'LemonButton--centered',
                !children && 'LemonButton--no-content',
                !!icon && `LemonButton--has-icon`,
                !!sideIcon && `LemonButton--has-side-icon`,
                truncate && 'LemonButton--truncate',
                className
            )
            const onClickHandler = (event: React.MouseEvent<HTMLElement>): void => {
                if (stopPropagation) {
                    event.stopPropagation()
                }
                if (disabled) {
                    event.preventDefault()
                    return
                }
                // Polaris <Button> only has a boolean `submit` prop, no native `type="reset"`.
                // Replicate the native reset behaviour explicitly so `htmlType="reset"` keeps working.
                if (htmlType === 'reset') {
                    ;(event.currentTarget as HTMLElement).closest('form')?.reset()
                }
                onClick?.(event as any)
            }
            const chromeContent = (
                <span className="LemonButton__chrome">
                    {icon ? <span className="LemonButton__icon">{icon}</span> : null}
                    {children ? <span className="LemonButton__content">{children}</span> : null}
                    {sideIcon ? (
                        <span className="LemonButton__icon">{sideIcon}</span>
                    ) : targetBlank && !hideExternalLinkIcon && !icon ? (
                        <IconExternal />
                    ) : null}
                </span>
            )

            let workingButton: JSX.Element
            if (to) {
                // Link-rendered buttons (navigation) keep their existing behaviour untouched —
                // client-side routing, notebook drag source, docs-panel handling, project-id
                // rewriting, etc. all live in `Link`/`ButtonPrimitives`, a separate system from
                // this component's own Polaris migration.
                if (!buttonProps['aria-label'] && typeof tooltip === 'string') {
                    buttonProps['aria-label'] = tooltip
                }
                workingButton = (
                    <Link
                        ref={ref as any}
                        className={legacyClassName}
                        onClick={onClickHandler}
                        aria-disabled={!!disabled}
                        disableClientSideRouting={disableClientSideRouting}
                        target={targetBlank ? '_blank' : undefined}
                        to={!disabled ? to : undefined}
                        {...buttonProps}
                        data-attr-id={buttonProps['data-attr-id'] ?? buttonProps['data-attr']}
                    >
                        {chromeContent}
                    </Link>
                )
            } else {
                // Plain action buttons: the real Polaris <Button> renders the visual chrome.
                // `legacyClassName` is kept on the wrapper for CSS/test back-compat (data-attr
                // discoverability, any external selector still targeting `.LemonButton--*`).
                if (!buttonProps['aria-label'] && typeof tooltip === 'string') {
                    buttonProps['aria-label'] = tooltip
                }
                workingButton = (
                    <span
                        className={legacyClassName}
                        data-attr={buttonProps['data-attr']}
                        data-attr-id={buttonProps['data-attr-id'] ?? buttonProps['data-attr']}
                    >
                        <PolarisButton
                            ref={ref as any}
                            id={buttonProps.id}
                            variant={type}
                            tone={status === 'danger' ? 'critical' : undefined}
                            size={POLARIS_SIZE_BY_LEMON_SIZE[size ?? 'medium']}
                            fullWidth={fullWidth}
                            pressed={active}
                            disabled={!!disabled}
                            loading={!!loading}
                            submit={htmlType === 'submit'}
                            accessibilityLabel={buttonProps['aria-label']}
                            onClick={onClickHandler as any}
                        >
                            {chromeContent as any}
                        </PolarisButton>
                    </span>
                )
            }

            if (buttonWrapper) {
                workingButton = buttonWrapper(workingButton)
            }

            if (tooltipContent || tooltipDocLink) {
                workingButton = (
                    <Tooltip
                        title={tooltipContent}
                        placement={tooltipPlacement}
                        arrowOffset={tooltipArrowOffset}
                        docLink={tooltipDocLink}
                        visible={tooltipForceMount}
                        interactive={disabledReasonInteractive}
                        closeDelayMs={disabledReasonInteractive ? INTERACTIVE_CLOSE_DELAY_MS : undefined}
                    >
                        {workingButton}
                    </Tooltip>
                )
            }

            if (sideAction) {
                const { dropdown: sideDropdown, divider: _, ...sideActionRest } = sideAction
                const SideComponent = sideDropdown ? LemonButtonWithDropdown : LemonButton

                workingButton = (
                    <div
                        onMouseEnter={buttonProps.onMouseEnter}
                        className={clsx(
                            `LemonButtonWithSideAction LemonButtonWithSideAction--${type}`,
                            fullWidth && 'LemonButtonWithSideAction--full-width'
                        )}
                    >
                        {workingButton}
                        <div className="LemonButtonWithSideAction__side-button">
                            <SideComponent
                                type={type}
                                size={size}
                                status={status}
                                dropdown={sideDropdown as LemonButtonDropdown}
                                noPadding
                                active={active}
                                {...sideActionRest}
                            />
                        </div>
                    </div>
                )
            }

            return workingButton
        }
    )
LemonButton.displayName = 'LemonButton'

export const WithinPageHeaderContext = React.createContext<boolean>(false)

export interface LemonButtonWithDropdownProps extends LemonButtonPropsBase {
    dropdown: LemonButtonDropdown
    sideIcon?: React.ReactElement | null
}

/**
 * Styled button that opens a dropdown menu on click.
 * The difference vs. plain `LemonButton` is dropdown visibility being controlled internally, which is more convenient.
 * @deprecated In almost all cases you should use the newer `LemonMenu` with a `LemonButton` child.
 */
export const LemonButtonWithDropdown: React.FunctionComponent<
    LemonButtonWithDropdownProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef(({ dropdown: dropdownProps, ...buttonProps }, ref): JSX.Element => {
    return (
        <LemonDropdown {...dropdownProps}>
            <LemonButton ref={ref} {...buttonProps} />
        </LemonDropdown>
    )
})
LemonButtonWithDropdown.displayName = 'LemonButtonWithDropdown'
