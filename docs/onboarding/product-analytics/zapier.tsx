import { OnboardingComponentsContext, createInstallation } from 'scenes/onboarding/shared/OnboardingDocsContentWrapper'

import { StepDefinition } from '../steps'

export const getZapierSteps = (ctx: OnboardingComponentsContext): StepDefinition[] => {
    const { CodeBlock, Markdown, dedent } = ctx

    return [
        {
            title: 'Connect Txlemetry to Zapier',
            badge: 'required',
            content: (
                <>
                    <Markdown>
                        Zapier lets you connect Txlemetry to thousands of other apps. You can use it to send events to
                        Txlemetry from other services or trigger actions based on Txlemetry events. Go to the [PostHog
                        integration page](https://zapier.com/apps/posthog/integrations) on Zapier and click **Connect
                        PostHog**. When prompted, enter your Txlemetry project token:
                    </Markdown>
                    <CodeBlock
                        blocks={[
                            {
                                language: 'text',
                                file: 'API Key',
                                code: dedent`
                                <ph_project_token>
                            `,
                            },
                        ]}
                    />
                    <Markdown>Enter your Txlemetry host:</Markdown>
                    <CodeBlock
                        blocks={[
                            {
                                language: 'text',
                                file: 'Host',
                                code: dedent`
                                <ph_client_api_host>
                            `,
                            },
                        ]}
                    />
                </>
            ),
        },
        {
            title: 'Create a Zap',
            badge: 'required',
            content: (
                <>
                    <Markdown>
                        Create a Zap that sends events to Txlemetry using the "Capture Event" action. Events captured via
                        Zapier will appear in Txlemetry just like events from any other source.
                    </Markdown>
                    <Markdown>
                        You can use Zapier to connect CRMs, payment processors, customer support tools, and more to your
                        Txlemetry analytics.
                    </Markdown>
                </>
            ),
        },
    ]
}

export const ZapierInstallation = createInstallation(getZapierSteps)
