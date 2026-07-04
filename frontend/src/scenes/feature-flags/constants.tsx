import { Link } from '@posthog/lemon-ui'

export const COHORT_BEHAVIORAL_LIMITATIONS_URL =
    'https://txlemetry.com/docs#feature-flags'

export const MATCHING_ESTIMATE_TOOLTIP = (
    <>
        <div>
            A user may have{' '}
            <Link to="https://txlemetry.com/docs#data-warehouse" target="_blank">
                multiple profiles
            </Link>
        </div>
        <div className="mt-1">
            Estimated from{' '}
            <Link to="https://txlemetry.com/docs#data-warehouse" target="_blank">
                identified users
            </Link>{' '}
            only. Anonymous visitors can still match this flag, so the actual number may be higher.
        </div>
    </>
)
