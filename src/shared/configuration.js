export const BACKEND_API_HOST    = process.env.API_HOST || 'http://mxsh.lvh.me:4000'
export const BACKEND_API_PREFIX  = `${BACKEND_API_HOST}/api}`

export const FRONTEND_API_HOST   = process.env.FRONTEND_HOST || 'http://mxsh.lvh.me:3000'
export const FRONTEND_API_PREFIX = `${FRONTEND_API_HOST}/api`

export const SENTRY_PUBLIC_DSN    = process.env.SENTRY_PUBLIC_DSN
export const SENTRY_PRIVATE_DSN   = process.env.SENTRY_PRIVATE_DSN
