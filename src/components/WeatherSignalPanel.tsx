import { useState } from 'react';
import { useWeatherSignals } from '../hooks/useWeatherSignals';
import { WindIcon, CloudRainIcon, ClockIcon, ShareIcon } from './Icons';
import './WeatherSignalPanel.css';

interface WeatherSignalPanelProps {
  region: string;
  cityCoords?: { lat: number; lon: number } | null;
}

const TCWS_COLORS: Record<number, string> = {
  0: 'var(--signal-green, #22c55e)',
  1: 'var(--signal-blue, #3b82f6)',
  2: 'var(--signal-amber, #f59e0b)',
  3: 'var(--signal-orange, #f97316)',
  4: 'var(--signal-red, #ef4444)',
  5: 'var(--signal-darkred, #1a1a2e)',
};

const RAINFALL_COLORS: Record<string, string> = {
  none: 'transparent',
  yellow: 'var(--signal-amber, #f59e0b)',
  orange: 'var(--signal-orange, #f97316)',
  red: 'var(--signal-red, #ef4444)',
};

export function WeatherSignalPanel({ region, cityCoords }: WeatherSignalPanelProps) {
  const { loading, signal } = useWeatherSignals(region, cityCoords);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  // Loading skeleton
  if (loading) {
    return (
      <div className="signal-panel signal-panel--loading" aria-busy="true" aria-label="Loading weather signals">
        <div className="signal-skeleton-badge" />
        <div className="signal-skeleton-lines">
          <div className="signal-skeleton-line" />
          <div className="signal-skeleton-line short" />
          <div className="signal-skeleton-line" />
        </div>
      </div>
    );
  }

  // Show nothing if no active signal or rainfall warning
  if (!signal || (signal.tcws === 0 && signal.rainfallWarning === 'none')) {
    return null;
  }

  const tcwsColor = TCWS_COLORS[signal.tcws] || TCWS_COLORS[0];
  const rainfallColor = RAINFALL_COLORS[signal.rainfallWarning];

  const handleShare = async () => {
    const text = `${signal.tcwsLabel} active in ${region}. Max wind: ${signal.maxWindGust}km/h. ${signal.rainfallLabel}. Stay safe! - Team Weather Lang`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Weather Warning', text });
      } catch {
        // User cancelled share — ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
      } catch {
        // Clipboard not available — ignore
      }
    }
  };

  return (
    <section
      className="signal-panel animate-in"
      role="alert"
      aria-label={`Weather signal: ${signal.tcwsLabel}, ${signal.rainfallLabel}`}
    >
      {/* TCWS Badge */}
      <div className="signal-panel__header">
        <div
          className="signal-badge"
          style={{ background: tcwsColor }}
          aria-label={`Tropical Cyclone Wind Signal level ${signal.tcws}`}
        >
          <span className="signal-badge__number">{signal.tcws}</span>
        </div>
        <div className="signal-panel__title-group">
          <h3 className="signal-panel__title">{signal.tcwsLabel}</h3>
          <p className="signal-panel__desc">{signal.tcwsDescription}</p>
        </div>
      </div>

      {/* Details */}
      <div className="signal-panel__details">
        {/* Rainfall warning */}
        {signal.rainfallWarning !== 'none' && (
          <div className="signal-detail" aria-label={signal.rainfallLabel}>
            <span
              className="signal-detail__dot"
              style={{ background: rainfallColor }}
            />
            <span className="signal-detail__text">{signal.rainfallLabel}</span>
          </div>
        )}

        {/* Max wind gust */}
        <div className="signal-detail" aria-label={`Maximum wind gust: ${signal.maxWindGust} kilometers per hour`}>
          <WindIcon size={16} color="var(--accent)" className="signal-detail__icon" />
          <span className="signal-detail__text">
            Max gust: <strong>{signal.maxWindGust} km/h</strong>
          </span>
        </div>

        {/* Max hourly rainfall */}
        <div className="signal-detail" aria-label={`Maximum hourly rainfall: ${signal.maxHourlyRain} millimeters`}>
          <CloudRainIcon size={16} color="var(--accent)" className="signal-detail__icon" />
          <span className="signal-detail__text">
            Max rainfall: <strong>{signal.maxHourlyRain} mm/hr</strong>
          </span>
        </div>

        {/* Valid until */}
        <div className="signal-detail signal-detail--muted" aria-label={`Valid until ${signal.validUntil}`}>
          <ClockIcon size={16} color="var(--text-muted)" className="signal-detail__icon" />
          <span className="signal-detail__text">Valid until {signal.validUntil}</span>
        </div>
      </div>

      {/* Share button */}
      <button
        className="signal-share-btn"
        onClick={handleShare}
        aria-label="Share weather warning"
        type="button"
      >
        <ShareIcon size={14} color="currentColor" />
        {shareStatus === 'copied' ? 'Copied!' : 'Share Warning'}
      </button>
    </section>
  );
}

export default WeatherSignalPanel;
