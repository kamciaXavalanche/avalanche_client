/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

module.exports = withNextIntl({
  nextConfig,
});
