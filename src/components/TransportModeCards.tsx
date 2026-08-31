import type { TransportImpact } from '../utils/surge-engine';
import { CarIcon, MotorcycleIcon, BusIcon, WalkingIcon } from './Icons';
import './TransportModeCards.css';

interface Props {
  impacts: TransportImpact[];
}

function renderModeIcon(mode: string) {
  switch (mode) {
    case 'grab':
      return <CarIcon size={22} color="currentColor" />;
    case 'angkas':
      return <MotorcycleIcon size={22} color="currentColor" />;
    case 'jeepney':
      return <BusIcon size={22} color="currentColor" />;
    case 'walking':
      return <WalkingIcon size={22} color="currentColor" />;
    default:
      return <CarIcon size={22} color="currentColor" />;
  }
}

export function TransportModeCards({ impacts }: Props) {
  return (
    <div className="transport-modes" role="list" aria-label="Transport mode impacts">
      {impacts.map((impact) => (
        <div
          key={impact.mode}
          className={`transport-card severity-${impact.severity}`}
          role="listitem"
          aria-label={`${impact.label}: ${impact.status}`}
        >
          <div className="tc-icon" aria-hidden="true">{renderModeIcon(impact.mode)}</div>
          <div className="tc-info">
            <span className="tc-name">{impact.label}</span>
            <strong className="tc-status">{impact.status}</strong>
            <span className="tc-tip">{impact.tip}</span>
          </div>
          <div className={`tc-severity-bar severity-bar-${impact.severity}`} />
        </div>
      ))}
    </div>
  );
}
