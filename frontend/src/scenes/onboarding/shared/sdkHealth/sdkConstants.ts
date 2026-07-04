import type { SdkType } from './sdkHealthLogic'

export const SDK_TYPE_READABLE_NAME: Record<SdkType, string> = {
    web: 'Web',
    'posthog-ios': 'iOS',
    'posthog-android': 'Android',
    'posthog-node': 'Node.js',
    'posthog-python': 'Python',
    'posthog-php': 'PHP',
    'posthog-ruby': 'Ruby',
    'posthog-go': 'Go',
    'posthog-flutter': 'Flutter',
    'posthog-react-native': 'React Native',
    'posthog-dotnet': '.NET',
    'posthog-elixir': 'Elixir',
}

export const SDK_DOCS_LINKS: Record<SdkType, { releases: string; docs: string }> = {
    web: {
        releases: 'https://github.com/Txlemetry/posthog-js/blob/main/packages/browser/CHANGELOG.md',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-ios': {
        releases: 'https://github.com/Txlemetry/posthog-ios/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-android': {
        releases: 'https://github.com/Txlemetry/posthog-android/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-node': {
        releases: 'https://github.com/Txlemetry/posthog-js/blob/main/packages/node/CHANGELOG.md',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-python': {
        releases: 'https://github.com/Txlemetry/posthog-python/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-php': {
        releases: 'https://github.com/Txlemetry/posthog-php/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-ruby': {
        releases: 'https://github.com/Txlemetry/posthog-ruby/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-go': {
        releases: 'https://github.com/Txlemetry/posthog-go/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-flutter': {
        releases: 'https://github.com/Txlemetry/posthog-flutter/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-react-native': {
        releases: 'https://github.com/Txlemetry/posthog-js/blob/main/packages/react-native/CHANGELOG.md',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-dotnet': {
        releases: 'https://github.com/Txlemetry/posthog-dotnet/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
    'posthog-elixir': {
        releases: 'https://github.com/Txlemetry/posthog-elixir/releases',
        docs: 'https://txlemetry.com/docs#sdks',
    },
}
