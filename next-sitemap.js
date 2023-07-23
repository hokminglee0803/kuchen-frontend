module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          allow: "/",
        }
      ],
    },
  }
  