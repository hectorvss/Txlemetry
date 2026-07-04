import { urls } from 'scenes/urls'

import { DataModelingHealthTable } from '../components/DataModelingHealthTable'
import { IngestionWarningTable } from '../components/IngestionWarningTable'
import { PipelineHealthTable } from '../components/PipelineHealthTable'
import { WebAnalyticsHealthTable } from '../components/WebAnalyticsHealthTable'
import type { HealthIssueCategory } from '../healthCategories'
import DataModelingDetailContent from './categories/DataModelingDetailContent'
import type { CategoryDetailContentComponent, HealthTableComponent } from './categoryDetailTypes'

export interface CategoryDetailConfig {
    docsUrl?: string
    deepDiveUrl?: string
    deepDiveLabel?: string
    guidance?: string
    contentComponent?: CategoryDetailContentComponent
    tableComponent?: HealthTableComponent
    /** If set, navigating to /health/{category} redirects to this URL instead of rendering a drill-down page. */
    redirectUrl?: string
}

export const CATEGORY_DETAIL_CONFIG: Partial<Record<HealthIssueCategory, CategoryDetailConfig>> = {
    ingestion: {
        docsUrl: 'https://txlemetry.com/docs#data-warehouse',
        guidance:
            'Ingestion issues mean some events may be delayed or missing. Check for warnings and address any lag.',
        redirectUrl: urls.ingestionWarnings(),
        tableComponent: IngestionWarningTable,
    },
    sdk: {
        docsUrl: 'https://txlemetry.com/docs#sdks',
        deepDiveUrl: urls.sdkHealth(),
        deepDiveLabel: 'Open SDK health',
        guidance: 'Outdated SDKs miss bug fixes and new features. Update to the latest version for best results.',
        redirectUrl: urls.sdkHealth(),
    },
    web_analytics: {
        docsUrl: 'https://txlemetry.com/docs#web-analytics',
        guidance: 'These checks ensure your web analytics data is complete and accurate.',
        redirectUrl: urls.webAnalyticsHealth(),
        tableComponent: WebAnalyticsHealthTable,
    },
    pipelines: {
        docsUrl: 'https://txlemetry.com/docs#data-pipelines',
        deepDiveUrl: urls.sources(),
        deepDiveLabel: 'Open sources',
        guidance: 'Pipeline failures mean data may not be flowing to your destinations correctly.',
        redirectUrl: urls.sources(),
        tableComponent: PipelineHealthTable,
    },
    data_modeling: {
        docsUrl: 'https://txlemetry.com/docs#data-warehouse',
        guidance: 'Materialized view failures may affect query performance and data freshness.',
        contentComponent: DataModelingDetailContent,
        tableComponent: DataModelingHealthTable,
    },
}
