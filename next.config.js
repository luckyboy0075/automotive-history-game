/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true, // Ensures correct routing
};

module.exports = nextConfig;
