/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
      domains: [
        'encrypted-tbn0.gstatic.com',
        'd1sag4ddilekf6.azureedge.net',
        'cdn.decorilla.com',
        'a0.muscache.com',
        'drive.google.com',
        'res.cloudinary.com'
      ],
  },
}

module.exports = nextConfig
