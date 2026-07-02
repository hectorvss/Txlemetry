import './TxlemetryAuthAside.scss'

import { TxlemetryWordmark } from 'lib/brand/TxlemetryBrand'

import brandCanvas from 'public/txlemetry/brand-canvas.png'

export function TxlemetryAuthAside(): JSX.Element {
    return (
        <div
            className="TxlemetryAuthAside"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(255, 251, 242, 0.12), rgba(19, 38, 24, 0.52)), url(${brandCanvas})`,
            }}
        >
            <TxlemetryWordmark className="TxlemetryAuthAside__brand" compact showTagline={false} />
            <div className="TxlemetryAuthAside__content">
                <span className="TxlemetryAuthAside__eyebrow">Product intelligence, reimagined</span>
                <h1 className="TxlemetryAuthAside__title">Read product behavior with the calm of a research studio.</h1>
                <p className="TxlemetryAuthAside__description">
                    Txlemetry brings events, journeys, experiments and AI-native context into one elegant operating
                    layer, so your team can move from raw clicks to confident decisions.
                </p>
                <div className="TxlemetryAuthAside__stats">
                    <div className="TxlemetryAuthAside__stat">
                        <span className="TxlemetryAuthAside__statValue">Events</span>
                        <span className="TxlemetryAuthAside__statLabel">
                            Deep behavioral capture across the product
                        </span>
                    </div>
                    <div className="TxlemetryAuthAside__stat">
                        <span className="TxlemetryAuthAside__statValue">Signals</span>
                        <span className="TxlemetryAuthAside__statLabel">
                            AI-assisted summaries that surface momentum
                        </span>
                    </div>
                    <div className="TxlemetryAuthAside__stat">
                        <span className="TxlemetryAuthAside__statValue">Loops</span>
                        <span className="TxlemetryAuthAside__statLabel">
                            Analytics, replay and experiments in one flow
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
