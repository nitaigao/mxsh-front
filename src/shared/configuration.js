export const BACKEND_API_HOST   = process.env.API_HOST || 'http://mxsh.lvh.me:4000'
export const BACKEND_API_PATH   = process.env.BACKEND_API_PATH || 'api'
export const BACKEND_API_PREFIX = `${BACKEND_API_HOST}/${BACKEND_API_PATH}`

export const FRONTEND_API_HOST   = process.env.FRONTEND_HOST || 'http://mxsh.lvh.me:3000'
export const FRONTEND_API_PATH   = process.env.FRONTEND_API_PATH || 'api'
export const FRONTEND_API_PREFIX = `${FRONTEND_API_HOST}/${FRONTEND_API_PATH}`

export const RAVEN_PUBLIC_DSN    = 'https://152e61414974418995a7dd86ab45a8cb@sentry.io/135520'
export const RAVEN_PRIVATE_DSN   = 'https://152e61414974418995a7dd86ab45a8cb:cb5c99929d644282aa512d8769bcbece@sentry.io/135520'
