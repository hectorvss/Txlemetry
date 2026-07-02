import { TxlemetryWordmark } from './TxlemetryBrand'

// TODO the rest of the app shouldn't be importing this ðŸ™ˆ
export function Logo({ style, className }: React.PropsWithoutRef<JSX.IntrinsicElements['svg']>): JSX.Element {
    return (
        <span style={style} className={className}>
            <TxlemetryWordmark showTagline={false} />
        </span>
    )
}
