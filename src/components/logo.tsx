

function Logo() {
  return (
    <svg
              className="w-60 h-auto"
              viewBox="0 0 1200 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#16A34A" />
                </linearGradient>

                <linearGradient id="darkGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#111827" />
                  <stop offset="100%" stopColor="#1F2937" />
                </linearGradient>

                <filter
                  id="shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="8"
                    stdDeviation="10"
                    floodColor="#000000"
                    floodOpacity="0.15"
                  />
                </filter>
              </defs>

              <g transform="translate(50,50)" filter="url(#shadow)">
                <rect
                  x="0"
                  y="0"
                  width="220"
                  height="220"
                  rx="48"
                  fill="url(#greenGradient)"
                />

                <path
                  d="M110 48C75 48 52 74 52 108C52 141 76 168 108 168C140 168 164 142 164 110C164 78 140 48 110 48Z"
                  fill="white"
                  opacity="0.95"
                />

                <path
                  d="M110 70C95 92 88 112 92 136C122 128 142 103 146 74C132 70 122 68 110 70Z"
                  fill="#22C55E"
                />

                <circle cx="72" cy="92" r="6" fill="#111827" />
                <circle cx="150" cy="132" r="6" fill="#111827" />
                <line
                  x1="78"
                  y1="92"
                  x2="120"
                  y2="84"
                  stroke="#111827"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="126"
                  y1="88"
                  x2="144"
                  y2="126"
                  stroke="#111827"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>
            </svg>
  )
}

export default Logo;