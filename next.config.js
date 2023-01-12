const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')
// eslint-disable-next-line no-undef
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}`)
  /*   HASURA_URL_DEV=https://klwebco-auth.hasura.app/v1/graphql
  HASURA_URL_PROD=https://authors.meetkatherine.com/v1/graphql */
  const env = {
    GRAPHQL_BASE_URL: (() => {
      if (isDev) return 'https://klwebco-auth.hasura.app/v1/graphql'
      if (isProd) {
        return 'https://authors.meetkatherine.com/v1/graphql'
      }
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    X_HASURA_ADMIN_SECRET: (() => {
      if (isDev) {
        return 'E9sFZ0ti8qwETKzd58dWuSYQg3JVR0PrN4fdhKj6tauA1M30KBR6laZRy1ItEjX4'
      }
      if (isProd) {
        return 'admin_secret'
      }
      return 'X_HASURA_ADMIN_SECRET:not (isDev,isProd)'
    })(),
    CLIENT_ID: 1,
    MAILCHIMP_KEY: '7630bc09970a3c16e244227dd2d06b4e-us14',
    MAILCHIMP_SERVER: 'us14',
    MAILCHIMP_LIST_ID: '3ae959bd60',
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  }

  // next.config.js object
  return {
    env,
  }

  /*   env: {
    GRAPHQL_BASE_URL: 'https://authors.meetkatherine.com/v1/graphql',
    USER_ID: 3,
    MAILCHIMP_KEY: '7630bc09970a3c16e244227dd2d06b4e-us14',
    MAILCHIMP_SERVER: 'us14',
    MAILCHIMP_LIST_ID: '3ae959bd60',
    STRIPE_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  }, */
}
//local "http://localhost:8081/v1/graphql"
//live "https://authors.meetkatherine.com/v1/graphql"
