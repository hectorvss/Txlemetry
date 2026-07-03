import './LemonLabel.scss'

import clsx from 'clsx'

import { IconInfo } from '@posthog/icons'

import { PayGateIcon } from 'lib/components/PayGateMini/PayGateButton'

import { AvailableFeature } from '~/types'

import { Link, LinkProps } from '../Link'
import { Tooltip } from '../Tooltip'

/**
 * NOTE ON POLARIS: Polaris has no standalone form-label component (its labels are baked into
 * Labelled form controls), so there is no real Polaris equivalent to delegate to. Wrapping the
 * label text in Polaris `<Text>` was evaluated and rejected: it would insert an extra element
 * inside the `<label>` (breaking `.LemonLabel > *`-style selectors and the flex layout defined
 * in LemonLabel.scss) and impose Polaris font sizing where this component intentionally
 * inherits the surrounding font size. The native `<label htmlFor>` semantics must stay.
 */
export interface LemonLabelProps extends Pick<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    'id' | 'htmlFor' | 'form' | 'children' | 'className' | 'onClick'
> {
    info?: React.ReactNode
    infoLink?: LinkProps['to']
    showOptional?: boolean
    onExplanationClick?: () => void
    htmlFor?: string
    premiumFeature?: AvailableFeature
}

export function LemonLabel({
    children,
    info,
    className,
    showOptional,
    onExplanationClick,
    infoLink,
    htmlFor,
    premiumFeature,
    ...props
}: LemonLabelProps): JSX.Element {
    return (
        <label className={clsx('LemonLabel', className)} htmlFor={htmlFor} {...props}>
            {children}

            {showOptional ? <span className="LemonLabel__extra">(optional)</span> : null}

            {onExplanationClick ? (
                <Link onClick={onExplanationClick}>
                    <span className="LemonLabel__extra">(what is this?)</span>
                </Link>
            ) : null}

            {info ? (
                <Tooltip title={info} interactive>
                    {infoLink ? (
                        <Link to={infoLink} target="_blank" className="inline-flex">
                            <IconInfo className="text-xl text-secondary shrink-0" />
                        </Link>
                    ) : (
                        <IconInfo className="text-xl text-secondary shrink-0" />
                    )}
                </Tooltip>
            ) : null}

            {premiumFeature && <PayGateIcon feature={premiumFeature} />}
        </label>
    )
}
