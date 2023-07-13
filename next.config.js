/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["gomez.pl", "res.cloudinary.com", "lamour.com.pl"],
  },
};

module.exports = nextConfig;
