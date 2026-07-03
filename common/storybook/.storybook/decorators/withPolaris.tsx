import { AppProvider as PolarisAppProvider } from '@shopify/polaris'
import polarisEnTranslations from '@shopify/polaris/locales/en.json'
import type { Decorator } from '@storybook/react'

/** Global story decorator providing the Polaris AppProvider context that
 * Lemon UI components need now that they render Polaris primitives internally.
 */
export const withPolaris: Decorator = (Story) => {
    return (
        <PolarisAppProvider i18n={polarisEnTranslations}>
            <Story />
        </PolarisAppProvider>
    )
}
