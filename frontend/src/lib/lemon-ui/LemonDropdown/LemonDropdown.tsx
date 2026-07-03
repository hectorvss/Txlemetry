import React, { MouseEventHandler, useContext, useRef, useState } from 'react'

import { Popover, PopoverOverlayContext, PopoverProps } from '../Popover'

export interface LemonDropdownProps extends Omit<PopoverProps, 'children' | 'visible'> {
    visible?: boolean
    /**
     *  Setting `visible` shifts the component to controlled mode.
     *  This lets you choose whether to start open (Defaults to false).
     *  Without having to take control of the visibility state.
     *  */
    startVisible?: boolean
    onVisibilityChange?: (visible: boolean) => void
    /**
     * Whether the dropdown should be closed on click inside.
     * @default true
     */
    closeOnClickInside?: boolean
    /** @default 'click' */
    trigger?: 'click' | 'hover'
    children: React.ReactElement<
        Record<string, any> & {
            onClick: MouseEventHandler
            active?: boolean
            'aria-haspopup': Required<React.AriaAttributes>['aria-haspopup']
        }
    >
}

/** A wrapper that provides a dropdown for any element supporting `onClick`. Built on top of Popover.
 *
 * POLARIS MIGRATION NOTE — deliberately NOT swapped to `@shopify/polaris` `<Popover>`.
 * Fiabilidad por encima de pureza: this component's floating behaviour is load-bearing and
 * tightly coupled to machinery Polaris's `<Popover>` cannot reproduce without regressions:
 *   - The internal `../Popover` owns `PopoverReferenceContext` / `PopoverOverlayContext`, which
 *     `LemonButton` reads to render its dropdown chevron + active state and to decide event
 *     propagation for popovers-inside-popovers (`parentPopoverLevel`). Polaris `<Popover>` exposes
 *     none of this context, so a swap would silently break nested menus and trigger affordances.
 *   - Positioning goes through `floating-ui` with a `useFloatingContainer()` portal root
 *     (`getPopupContainer`-style floating containers, popovers-inside-modals) and a global
 *     nested-popover level registry for correct outside-click dismissal. Polaris `<Popover>`
 *     manages its OWN portal/overlay/positioning and `onClose(source)` contract, incompatible with
 *     the controlled `visible`/`onVisibilityChange` + `closeOnClickInside`/`trigger: 'hover'` API here.
 *   - The `.Popover` DOM class + transition timing is relied on by tests and consumers.
 * The visual look is already Polaris-native because the overlay content is built from `LemonButton`
 * (already migrated to real Polaris `<Button>`). No public API, prop, or observable behaviour changes.
 */
export const LemonDropdown = React.forwardRef<HTMLDivElement, LemonDropdownProps>(
    (
        {
            visible,
            onVisibilityChange,
            onClickOutside,
            onClickInside,
            onMouseLeaveInside,
            closeOnClickInside = true,
            trigger = 'click',
            children,
            startVisible,
            ...popoverProps
        },
        ref
    ) => {
        const isControlled = visible !== undefined

        const [, parentPopoverLevel] = useContext(PopoverOverlayContext)
        const [localVisible, setLocalVisible] = useState(visible ?? startVisible ?? false)

        const floatingRef = useRef<HTMLDivElement>(null)
        const referenceRef = useRef<HTMLSpanElement>(null)

        const effectiveVisible = visible ?? localVisible

        const setVisible = (value: boolean): void => {
            if (!isControlled) {
                setLocalVisible(value)
            }
            onVisibilityChange?.(value)
        }

        return (
            <Popover
                ref={ref}
                floatingRef={floatingRef}
                referenceRef={referenceRef}
                onClickOutside={(e) => {
                    if (trigger === 'click') {
                        setVisible(false)
                    }
                    onClickOutside?.(e)
                }}
                onClickInside={(e) => {
                    e.stopPropagation()
                    closeOnClickInside && setVisible(false)
                    onClickInside?.(e)
                }}
                onMouseLeaveInside={(e) => {
                    // relatedTarget is null when leaving the window and isn't always a Node, so
                    // Node.contains() would throw — treat anything that isn't a contained Node as "left".
                    const relatedTarget = e.relatedTarget
                    if (
                        trigger === 'hover' &&
                        !(relatedTarget instanceof Node && referenceRef.current?.contains(relatedTarget))
                    ) {
                        setVisible(false)
                    }
                    onMouseLeaveInside?.(e)
                }}
                visible={effectiveVisible}
                {...popoverProps}
            >
                {React.cloneElement(children, {
                    onClick: (e: React.MouseEvent): void => {
                        setVisible(!effectiveVisible)
                        children.props.onClick?.(e)
                        if (parentPopoverLevel > -1) {
                            // If this button is inside another popover, let's not propagate this event so that
                            // the parent popover doesn't close
                            e.stopPropagation()
                        }
                    },
                    onMouseEnter: (): void => {
                        if (trigger === 'hover') {
                            setVisible(true)
                        }
                    },
                    onMouseLeave: (e: React.MouseEvent): void => {
                        const relatedTarget = e.relatedTarget
                        if (
                            trigger === 'hover' &&
                            !(relatedTarget instanceof Node && floatingRef.current?.contains(relatedTarget))
                        ) {
                            setVisible(false)
                        }
                    },
                    'aria-haspopup': 'true',
                })}
            </Popover>
        )
    }
)
LemonDropdown.displayName = 'Dropdown'
