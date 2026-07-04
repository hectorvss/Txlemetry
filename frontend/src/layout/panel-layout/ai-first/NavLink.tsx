import { useValues } from 'kea'

import { IconGear } from '@posthog/icons'
import { LemonTag } from '@posthog/lemon-ui'

import { Link } from 'lib/lemon-ui/Link'
import { ButtonGroupPrimitive, ButtonPrimitive } from 'lib/ui/Button/ButtonPrimitives'
import { cn } from 'lib/utils/css-classes'
import { removeProjectIdIfPresent } from 'lib/utils/kea-router'
import { urls } from 'scenes/urls'

import { panelLayoutLogic } from '~/layout/panel-layout/panelLayoutLogic'
export interface NavLinkSideAction {
    onClick: (e: React.MouseEvent) => void
    tooltip: string
    'data-attr'?: string
}

interface NavLinkProps {
    to: string
    label: string
    icon: React.ReactNode
    isCollapsed: boolean
    'data-attr'?: string
    onClick?: (e: React.MouseEvent) => void
    sideAction?: NavLinkSideAction
    tag?: 'alpha' | 'beta' | 'new'
}

export function NavLink({
    to,
    label,
    icon,
    isCollapsed,
    'data-attr': dataAttr,
    onClick,
    sideAction,
    tag,
}: NavLinkProps): JSX.Element {
    const { pathname } = useValues(panelLayoutLogic)

    const isHomePage = to === urls.projectRoot()
    const currentPath = removeProjectIdIfPresent(pathname)
    const isActive = currentPath === to || (isHomePage && currentPath === urls.projectHomepage())
    const hasSideActionRight = !!sideAction && !isCollapsed

    return (
        <ButtonGroupPrimitive
            fullWidth
            className="group/wrapper flex justify-center [&>span]:w-full [&>span]:flex [&>span]:justify-center"
        >
            <Link
                buttonProps={{
                    menuItem: !isCollapsed,
                    iconOnly: isCollapsed,
                    className: 'group -outline-offset-2',
                    active: isActive,
                    hasSideActionRight,
                }}
                to={to}
                data-attr={dataAttr}
                onClick={onClick}
                tooltip={label}
                tooltipPlacement="right"
            >
                <span
                    className={cn(
                        // Txlemetry sidebar: icons black (text-primary, theme-aware) at full opacity
                        // and a heavier stroke so they read bolder than the original 50%-opacity grey.
                        'relative size-4 text-primary opacity-100 transition-all duration-50 [&_svg]:stroke-[2.25]'
                    )}
                >
                    {icon}
                </span>
                {!isCollapsed && (
                    <span
                        className={cn(
                            // Txlemetry sidebar: labels bold + primary (black in light, theme-aware).
                            'flex-1 truncate text-left text-primary font-semibold'
                        )}
                    >
                        {label}
                    </span>
                )}
                {!isCollapsed && tag && (
                    <LemonTag
                        type={tag === 'alpha' ? 'completion' : tag === 'beta' ? 'warning' : 'success'}
                        size="small"
                        className="relative top-[-1px]"
                    >
                        {tag.toUpperCase()}
                    </LemonTag>
                )}
            </Link>
            {hasSideActionRight && sideAction && (
                <ButtonPrimitive
                    className="group -outline-offset-2"
                    iconOnly
                    isSideActionRight
                    onClick={(e) => {
                        e.stopPropagation()
                        sideAction.onClick(e)
                    }}
                    tooltip={sideAction.tooltip}
                    tooltipPlacement="right"
                    data-attr={sideAction['data-attr']}
                >
                    <IconGear className="size-3 text-tertiary opacity-70 group-hover:text-primary group-hover:opacity-100" />
                </ButtonPrimitive>
            )}
        </ButtonGroupPrimitive>
    )
}
