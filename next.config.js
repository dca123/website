// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  /** @type {import('next').NextConfig} */
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "s3.us-west-2.amazonaws.com",
      "res.cloudinary.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
});
