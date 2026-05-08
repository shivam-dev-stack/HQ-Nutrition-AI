"use client";

export default function SignupPage() {
  return (
    <div>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto  sm:w-full sm:max-w-sm">
          <div className="w-40 mx-auto">
            <svg
              width="400"
              height="160"
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
          </div>

          <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Start your health journey
          </h2>
          {/* <p className="text-center text-gray-500 mt-2">
            Continue your health journey
          </p> */}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-500"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  className="
                    block w-full rounded-xl border border-gray-300
                    px-4 py-3 text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-500"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="
                    block w-full rounded-xl border border-gray-300
                    px-4 py-3 text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-500"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  className="
                    block w-full rounded-xl border border-gray-300
                    px-4 py-3 text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    "
                />
              </div>
              <p className="mt-1 text-sm text-gray-400">Minimum 8 characters</p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-500"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
                  autoComplete="new-password"
                  className="
                    block w-full rounded-xl border border-gray-300
                    px-4 py-3 text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    "
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-3 text-sm/6 font-semibold text-white hover:bg-green-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already a member?
            <a
              href="#"
              className="font-semibold text-green-400 hover:text-green-300"
            >
              {" "} Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
