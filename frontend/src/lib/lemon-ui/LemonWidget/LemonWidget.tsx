import './LemonWidget.scss'

import { Card as PolarisCard } from '@shopify/polaris'
import clsx from 'clsx'

import { IconX } from '@posthog/icons'

import { LemonButton } from '../LemonButton'

export interface LemonWidgetProps {
    title: React.ReactNode
    onClose?: () => void
    actions?: React.ReactNode
    children: React.ReactNode
    className?: string
}

export function LemonWidget({ title, onClose, actions, children, className }: LemonWidgetProps): JSX.Element {
    return (
        <Widget className={className}>
            <Header>
                <span className="flex-1 text-primary-alt px-2 truncate">{title}</span>
                {actions}

                {onClose && <LemonButton status="danger" onClick={onClose} size="small" icon={<IconX />} />}
            </Header>
            <Content>{children}</Content>
        </Widget>
    )
}

const Widget = ({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element => {
    // The widget surface (background, border/shadow, rounded corners) is now a real Polaris
    // <Card>. The `.LemonWidget` wrapper div is kept for the public `className` prop and for
    // external selectors (e.g. Notebook.scss targets `> .LemonWidget .LemonWidget__content`,
    // which still matches since header/content remain descendants). `padding="0"` because
    // header/content manage their own padding, exactly as before.
    return (
        <div className={clsx('LemonWidget', className)}>
            <PolarisCard padding="0" roundedAbove="xs">
                {children}
            </PolarisCard>
        </div>
    )
}

const Header = ({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element => {
    return <div className={clsx('LemonWidget__header', className)}>{children}</div>
}

const Content = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return <div className="LemonWidget__content border-t border-primary">{children}</div>
}
