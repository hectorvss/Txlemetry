import './TxlemetryBrand.scss'

import clsx from 'clsx'

import txlemetryMark from 'public/txlemetry/mark.png'

type BrandClassNameProps = {
    className?: string
}

export function TxlemetryMark({ className }: BrandClassNameProps): JSX.Element {
    return <img src={txlemetryMark} alt="Txlemetry" className={clsx('TxlemetryBrand__mark', className)} />
}

export function TxlemetryWordmark({
    className,
    compact = false,
    showTagline = true,
}: BrandClassNameProps & { compact?: boolean; showTagline?: boolean }): JSX.Element {
    return (
        <span
            className={clsx(
                'TxlemetryBrand',
                compact && 'TxlemetryBrand--compact',
                !showTagline && 'TxlemetryBrand--wordmarkOnly',
                className
            )}
        >
            <TxlemetryMark />
            <span className="TxlemetryBrand__text">
                <span className="TxlemetryBrand__name">Txlemetry</span>
                {showTagline ? <span className="TxlemetryBrand__tagline">AI-native product analytics</span> : null}
            </span>
        </span>
    )
}
