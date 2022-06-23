/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co', 'raw.githubusercontent.com']
  },
  env: {
    APP_POKE_URL: process.env.APP_POKE_URL
  }
}
