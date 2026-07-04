/**
 * SDK logos can be either:
 * - Cloudinary URLs (string) - preferred, for logos hosted on Cloudinary CDN
 * - SVG/PNG files (imported as images) - for logos not yet on Cloudinary
 * - TSX components (React.memo) - for logos that need Tailwind's `dark:fill-white` class to work,
 *   since CSS classes inside SVG files don't apply when rendered as <img> tags
 */
import { Logomark } from 'lib/brand/Logomark'

import { SDK, SDKKey, SDKTag } from '~/types'

import androidImage from './logos/android.svg'
import angularImage from './logos/angular.svg'
import { AnthropicLogo } from './logos/AnthropicLogo'
import { AstroLogo } from './logos/AstroLogo'
import { BubbleLogo } from './logos/BubbleLogo'
import djangoImage from './logos/django.svg'
import docusaurusImage from './logos/docusaurus.svg'
import dotnetImage from './logos/dotnet.svg'
import elixirImage from './logos/elixir.svg'
import flutterImage from './logos/flutter.svg'
import { FramerLogo } from './logos/FramerLogo'
import gatsbyImage from './logos/gatsby.svg'
import geminiImage from './logos/gemini.svg'
import goImage from './logos/go.svg'
import gtmImage from './logos/gtm.svg'
import honoImage from './logos/hono.svg'
import { IOSLogo } from './logos/IOSLogo'
import javaImage from './logos/java.svg'
import jsImage from './logos/javascript_web.svg'
import { LangChainLogo } from './logos/LangChainLogo'
import langfuseImage from './logos/langfuse.svg'
import laravelImage from './logos/laravel.svg'
import moengageImage from './logos/moengage.png'
import n8nImage from './logos/n8n.svg'
import nextjsImage from './logos/nextjs.svg'
import nodejsImage from './logos/nodejs.svg'
import nuxtImage from './logos/nuxt.svg'
import { OpenAILogo } from './logos/OpenAILogo'
import { OpenRouterLogo } from './logos/OpenRouterLogo'
import phpImage from './logos/php.svg'
import pythonImage from './logos/python.svg'
import railsImage from './logos/rails.svg'
import reactImage from './logos/react.svg'
import reactNativeImage from './logos/react.svg'
import { ReactRouterLogo } from './logos/ReactRouterLogo'
import { RemixLogo } from './logos/RemixLogo'
import { RetoolLogo } from './logos/RetoolLogo'
import rubyImage from './logos/ruby.svg'
import { RudderstackLogo } from './logos/RudderstackLogo'
import rustImage from './logos/rust.svg'
import segmentImage from './logos/segment.svg'
import { SentryLogo } from './logos/SentryLogo'
import shopifyImage from './logos/shopify.svg'
import svelteImage from './logos/svelte.svg'
import tanStackImage from './logos/tanstack.png'
import traceloopImage from './logos/traceloop.svg'
import viteImage from './logos/vite.svg'
import vueImage from './logos/vue.svg'
import webflowImage from './logos/webflow.svg'
import { WordpressLogo } from './logos/WordpressLogo'
import zapierImage from './logos/zapier.svg'

export const ALL_SDKS: SDK[] = [
    // Web
    {
        name: 'Next.js',
        key: SDKKey.NEXT_JS,
        tags: [SDKTag.WEB, SDKTag.SERVER, SDKTag.POPULAR],
        recommended: true,
        image: nextjsImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Web',
        key: SDKKey.JS_WEB,
        recommended: true,
        tags: [SDKTag.POPULAR, SDKTag.WEB],
        image: jsImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'React',
        key: SDKKey.REACT,
        tags: [SDKTag.WEB, SDKTag.POPULAR],
        recommended: true,
        image: reactImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'React Native',
        key: SDKKey.REACT_NATIVE,
        tags: [SDKTag.MOBILE, SDKTag.POPULAR],
        recommended: true,
        image: reactNativeImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Android',
        key: SDKKey.ANDROID,
        tags: [SDKTag.MOBILE],
        image: androidImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Angular',
        key: SDKKey.ANGULAR,
        tags: [SDKTag.WEB],
        image: angularImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'API',
        key: SDKKey.API,
        tags: [SDKTag.SERVER, SDKTag.INTEGRATION],
        image: (
            <span className="flex h-8 w-8">
                <Logomark />
            </span>
        ),
        docsLink: 'https://txlemetry.com/docs#endpoints',
    },
    {
        name: 'Astro',
        key: SDKKey.ASTRO,
        tags: [SDKTag.WEB],
        image: <AstroLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Bubble',
        key: SDKKey.BUBBLE,
        tags: [SDKTag.WEB],
        image: <BubbleLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Django',
        key: SDKKey.DJANGO,
        tags: [SDKTag.SERVER],
        image: djangoImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: '.NET',
        key: SDKKey.DOTNET,
        tags: [SDKTag.SERVER],
        image: dotnetImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Elixir',
        key: SDKKey.ELIXIR,
        tags: [SDKTag.SERVER],
        image: elixirImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Flutter',
        key: SDKKey.FLUTTER,
        tags: [SDKTag.MOBILE],
        image: flutterImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Framer',
        key: SDKKey.FRAMER,
        tags: [SDKTag.WEB],
        image: <FramerLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Gatsby',
        key: SDKKey.GATSBY,
        tags: [SDKTag.WEB],
        image: gatsbyImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Go',
        key: SDKKey.GO,
        tags: [SDKTag.SERVER],
        image: goImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Hono',
        key: SDKKey.HONO,
        tags: [SDKTag.SERVER],
        image: honoImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'OpenAI',
        key: SDKKey.OPENAI,
        tags: [SDKTag.MODEL_PROVIDER, SDKTag.FRAMEWORK],
        image: <OpenAILogo />,
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'OpenAI Agents',
        key: SDKKey.OPENAI_AGENTS,
        tags: [SDKTag.FRAMEWORK],
        image: <OpenAILogo />,
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Anthropic',
        key: SDKKey.ANTHROPIC,
        tags: [SDKTag.MODEL_PROVIDER],
        image: <AnthropicLogo />,
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Google Gemini',
        key: SDKKey.GOOGLE_GEMINI,
        tags: [SDKTag.MODEL_PROVIDER],
        image: geminiImage,
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Vercel AI SDK',
        key: SDKKey.VERCEL_AI,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/vercel_373fa70879.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'LangChain',
        key: SDKKey.LANGCHAIN,
        tags: [SDKTag.FRAMEWORK],
        image: <LangChainLogo />,
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'LiteLLM',
        key: SDKKey.LITELLM,
        tags: [SDKTag.FRAMEWORK, SDKTag.GATEWAY],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/litellmicon_a2805d75e5.png',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'OpenRouter',
        key: SDKKey.OPENROUTER,
        tags: [SDKTag.GATEWAY],
        image: <OpenRouterLogo />,
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Cloudflare AI Gateway',
        key: SDKKey.CLOUDFLARE_AI_GATEWAY,
        tags: [SDKTag.GATEWAY],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cloudflare_logo_6572a9f441.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Dedalus Labs',
        key: SDKKey.DEDALUS,
        tags: [SDKTag.GATEWAY],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/dedalus_labs_logo_e03bb97137.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'DeepSeek',
        key: SDKKey.DEEPSEEK,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/deepseek_df02608124.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'LangGraph',
        key: SDKKey.LANGGRAPH,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/langgraph_2f91869ac8.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Ollama',
        key: SDKKey.OLLAMA,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ollama_ff56896a1f.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'AWS Bedrock',
        key: SDKKey.AWS_BEDROCK,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/bedrock_5c06698148.png',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Azure OpenAI',
        key: SDKKey.AZURE_OPENAI,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/azure_openai_884ba0124a.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Groq',
        key: SDKKey.GROQ,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/groq_a0ed539e47.png',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Mistral',
        key: SDKKey.MISTRAL,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/mistral_551c75e2dd.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'LlamaIndex',
        key: SDKKey.LLAMAINDEX,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/llamaindex_f831132d7c.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'CrewAI',
        key: SDKKey.CREWAI,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/crewai_67ee9f5eb6.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Instructor',
        key: SDKKey.INSTRUCTOR,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/instructor_b1982d9ce9.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Pydantic AI',
        key: SDKKey.PYDANTIC_AI,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/pydantic_ai_55029bc39b.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'xAI',
        key: SDKKey.XAI,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/xai_77b917714b.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Perplexity',
        key: SDKKey.PERPLEXITY,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/perplexity_7d451cb62c.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Together AI',
        key: SDKKey.TOGETHER_AI,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/together_ai_49ac1a57fb.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Fireworks AI',
        key: SDKKey.FIREWORKS_AI,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/fireworks_ai_a3d8a59e96.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Cohere',
        key: SDKKey.COHERE,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cohere_0ddf02d545.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Hugging Face',
        key: SDKKey.HUGGING_FACE,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hugging_face_ae0a406f62.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'DSPy',
        key: SDKKey.DSPY,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/dspy_548bc2f255.webp',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'AutoGen',
        key: SDKKey.AUTOGEN,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/autogen_a8c56d013e.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Semantic Kernel',
        key: SDKKey.SEMANTIC_KERNEL,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,c_limit,q_auto,f_auto/semantic_kernel_5102489978.png',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'smolagents',
        key: SDKKey.SMOLAGENTS,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/smolagents_logo_1_545072ae17.png',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Mastra',
        key: SDKKey.MASTRA,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/mastra_7ea7df92ab.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Mirascope',
        key: SDKKey.MIRASCOPE,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/mirascope_33f38e04ea.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Convex',
        key: SDKKey.CONVEX,
        tags: [SDKTag.FRAMEWORK],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/convex_d8dcddcd63.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Cerebras',
        key: SDKKey.CEREBRAS,
        tags: [SDKTag.MODEL_PROVIDER],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/cerebras_4d953c1c2b.png',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Vercel AI Gateway',
        key: SDKKey.VERCEL_AI_GATEWAY,
        tags: [SDKTag.GATEWAY],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/vercel_373fa70879.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Portkey',
        key: SDKKey.PORTKEY,
        tags: [SDKTag.GATEWAY],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/portkey_15a83f0395.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Helicone',
        key: SDKKey.HELICONE,
        tags: [SDKTag.LLM, SDKTag.GATEWAY],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/helicone_7c41fa4c2d.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Manual Capture',
        key: SDKKey.MANUAL_CAPTURE,
        tags: [SDKTag.FRAMEWORK, SDKTag.MODEL_PROVIDER, SDKTag.GATEWAY],
        image: (
            <span className="flex w-8 pb-3">
                <Logomark />
            </span>
        ),
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'OpenTelemetry',
        key: SDKKey.OPENTELEMETRY,
        tags: [SDKTag.INTEGRATION],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/opentelemetry_afb29df5ab.svg',
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'iOS',
        key: SDKKey.IOS,
        tags: [SDKTag.MOBILE],
        image: <IOSLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Java',
        key: SDKKey.JAVA,
        tags: [SDKTag.SERVER],
        image: javaImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Langfuse',
        key: SDKKey.LANGFUSE,
        tags: [SDKTag.LLM],
        image: langfuseImage,
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Laravel',
        key: SDKKey.LARAVEL,
        tags: [SDKTag.SERVER],
        image: laravelImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Node.js',
        key: SDKKey.NODE_JS,
        tags: [SDKTag.SERVER, SDKTag.POPULAR],
        recommended: true,
        image: nodejsImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Nuxt.js 3.7+',
        key: SDKKey.NUXT_JS,
        tags: [SDKTag.WEB, SDKTag.SERVER],
        image: nuxtImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Nuxt.js 3.6 and below',
        key: SDKKey.NUXT_JS_36,
        tags: [SDKTag.WEB, SDKTag.SERVER],
        image: nuxtImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'PHP',
        key: SDKKey.PHP,
        tags: [SDKTag.SERVER],
        image: phpImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Python',
        key: SDKKey.PYTHON,
        tags: [SDKTag.SERVER, SDKTag.POPULAR],
        recommended: true,
        image: pythonImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'React Router',
        key: SDKKey.REACT_ROUTER,
        tags: [SDKTag.WEB],
        searchTerms: ['remix'],
        image: <ReactRouterLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Remix',
        key: SDKKey.REMIX,
        tags: [SDKTag.WEB],
        image: <RemixLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Ruby',
        key: SDKKey.RUBY,
        tags: [SDKTag.SERVER],
        image: rubyImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Ruby on Rails',
        key: SDKKey.RUBY_ON_RAILS,
        tags: [SDKTag.SERVER],
        image: railsImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Rust',
        key: SDKKey.RUST,
        tags: [SDKTag.SERVER],
        image: rustImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Svelte',
        key: SDKKey.SVELTE,
        tags: [SDKTag.WEB],
        image: svelteImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'TanStack Start',
        key: SDKKey.TANSTACK_START,
        tags: [SDKTag.WEB],
        image: tanStackImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Traceloop',
        key: SDKKey.TRACELOOP,
        tags: [SDKTag.LLM],
        image: traceloopImage,
        docsLink: 'https://txlemetry.com/docs',
    },
    {
        name: 'Vite',
        key: SDKKey.VITE,
        tags: [SDKTag.WEB],
        image: viteImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Vue.js',
        key: SDKKey.VUE_JS,
        tags: [SDKTag.WEB],
        image: vueImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Webflow',
        key: SDKKey.WEBFLOW,
        tags: [SDKTag.WEB],
        image: webflowImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    // Integrations
    {
        name: 'Google Tag Manager',
        key: SDKKey.GOOGLE_TAG_MANAGER,
        tags: [SDKTag.WEB, SDKTag.INTEGRATION],
        image: gtmImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Docusaurus',
        key: SDKKey.DOCUSAURUS,
        tags: [SDKTag.INTEGRATION],
        image: docusaurusImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'MoEngage',
        key: SDKKey.MOENGAGE,
        tags: [SDKTag.WEB, SDKTag.INTEGRATION],
        image: moengageImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'n8n',
        key: SDKKey.N8N,
        tags: [SDKTag.INTEGRATION],
        image: n8nImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Segment',
        key: SDKKey.SEGMENT,
        tags: [SDKTag.INTEGRATION],
        image: segmentImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Sentry',
        key: SDKKey.SENTRY,
        tags: [SDKTag.INTEGRATION],
        image: <SentryLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Shopify',
        key: SDKKey.SHOPIFY,
        tags: [SDKTag.INTEGRATION],
        image: shopifyImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'RudderStack',
        key: SDKKey.RUDDERSTACK,
        tags: [SDKTag.INTEGRATION],
        image: <RudderstackLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Wordpress',
        key: SDKKey.WORDPRESS,
        tags: [SDKTag.INTEGRATION],
        image: <WordpressLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Retool',
        key: SDKKey.RETOOL,
        tags: [SDKTag.INTEGRATION],
        image: <RetoolLogo />,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
    {
        name: 'Zapier',
        key: SDKKey.ZAPIER,
        tags: [SDKTag.INTEGRATION],
        image: zapierImage,
        docsLink: 'https://txlemetry.com/docs#sdks',
    },
]
