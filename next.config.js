const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: [
      'assets.vercel.com',
      'res.cloudinary.com',
      'images.ctfassets.net',
      'www.kuchen.com.hk',
      'kuchen.vercel.app',
      'kuchen-hokminglee0803.vercel.app',
      'kuchen-git-main-hokminglee0803.vercel.app',
      'kuchen-6sudsmoxh-hokminglee0803.vercel.app'
    ],
  },
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'en',
    localeDetection: false
  },
}

module.exports = nextConfig
