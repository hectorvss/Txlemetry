import { LemonBanner, Link } from '@posthog/lemon-ui'

export function SessionAnalysisWarning(): JSX.Element {
    return (
        <LemonBanner type="info" className="mb-4">
            When using sessions and session properties, events without session IDs will be excluded from the set of
            results. <Link to="https://txlemetry.com/docs">Learn more about sessions.</Link>
        </LemonBanner>
    )
}
