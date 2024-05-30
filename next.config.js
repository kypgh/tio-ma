/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["i.ytimg.com", "social-mt5.tiomarkets.com"],
  },
  experimental: {
    largePageDataBytes: 256 * 100000,
  },
  i18n: {
    locales: [
      "en",
      "de",
      "es",
      "fr",
      "it",
      "nl",
      "pt",
      "ms",
      "ar",
      "cz",
      "hi",
      "id",
      "hu",
      "pl",
      "th",
      "vi",
      "zh-hans",
      "zh-tw",
      "tr",
      "el",
    ],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
