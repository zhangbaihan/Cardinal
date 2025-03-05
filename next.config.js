/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Set output to export for static site generation
  distDir: 'out', // Output directory for the static build
  images: {
    unoptimized: true, // Required for static export
  },
  // Configure trailing slash for consistent routing
  trailingSlash: true,
}

module.exports = nextConfig 