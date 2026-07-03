import { useWindowSize } from 'lib/hooks/useWindowSize'

import { LemonSegmentedButton, LemonSegmentedButtonProps } from '../LemonSegmentedButton'
import { LemonSelect, LemonSelectProps } from '../LemonSelect'

/**
 * POLARIS MIGRATION NOTE: no direct change needed here. This is a pure responsive switch that
 * renders either `<LemonSegmentedButton>` (wide viewports) or `<LemonSelect>` (narrow / many
 * options). Both of those are migrated in their own folders, so LemonSegmentedSelect inherits the
 * real Polaris primitives automatically and its public API is unchanged.
 */

export type LemonSegmentedSelectProps<T extends string | number> = LemonSegmentedButtonProps<T> &
    LemonSelectProps<T> & {
        shrinkOn?: number
    }

export function LemonSegmentedSelect<T extends string | number>({
    shrinkOn,
    ...props
}: LemonSegmentedSelectProps<T>): JSX.Element {
    const {
        windowSize: { width = 0 },
    } = useWindowSize()

    if ((shrinkOn != null && props.options.length >= shrinkOn) || width < props.options.length * 100) {
        return <LemonSelect {...props} />
    }

    return <LemonSegmentedButton {...props} />
}
