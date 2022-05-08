const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['images.ctfassets.net', 'www.kuchen.com.hk'],
  },
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'en',
    localeDetection: false
  },
}

module.exports = nextConfig
