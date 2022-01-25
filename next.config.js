/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com", "s3.us-west-2.amazonaws.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  }
}
