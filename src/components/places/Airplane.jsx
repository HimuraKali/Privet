/** SVG-самолёт (фрагмент для вставки в карту) */
export default function AirplaneMark({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform="translate(-20, -20) scale(0.65)">
        <path
          fill="#fff5f8"
          stroke="#e87a9e"
          strokeWidth="1.5"
          d="M56 30c2 0 4 1.2 4 2.8S58 35.6 56 35.6H38l-8 14H24l4-14H14l-6 6H4l4-8-4-8h4l6 6h14l-4-14h6l8 14h18z"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(232,122,158,0.45))' }}
        />
        <circle cx="50" cy="32" r="2.2" fill="#f4a5c0" />
      </g>
    </g>
  )
}

/** HTML-версия для стартового экрана */
export function AirplaneHtml({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      width="42"
      height="42"
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      <path
        fill="#fff5f8"
        stroke="#e87a9e"
        strokeWidth="1.2"
        d="M56 30c2 0 4 1.2 4 2.8S58 35.6 56 35.6H38l-8 14H24l4-14H14l-6 6H4l4-8-4-8h4l6 6h14l-4-14h6l8 14h18z"
      />
      <circle cx="50" cy="32" r="2.2" fill="#f4a5c0" />
    </svg>
  )
}
