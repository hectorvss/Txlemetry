import { Link } from '@posthog/lemon-ui'

import { TxlemetryWordmark } from 'lib/brand/TxlemetryBrand'
import { urls } from 'scenes/urls'

export function WelcomeLogo({ view }: { view?: string }): JSX.Element {
    return (
        <Link to={urls.default()} className="flex flex-col items-center mb-8" data-attr={`${view || 'welcome'}-brand`}>
            <TxlemetryWordmark compact />
        </Link>
    )
}
