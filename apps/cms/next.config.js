const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      // TODO: remove after tests
      {
        hostname: "**",
        pathname: "**",
        port: "",
        protocol: "http",
      },
      {
        hostname: "**",
        pathname: "**",
        port: "",
        protocol: "https",
      },
      {
        hostname: "minio",
        pathname: "**",
        port: "9000",
        protocol: "http",
      },
      {
        hostname: "minio",
        pathname: "**",
        port: "9000",
        protocol: "https",
      },
    ],
  },
  nx: {
    svgr: false,
  },
  reactStrictMode: true,
  transpilePackages: [
    "@/db",
    "@/shared",
    "@/tailwind",
    "@/tailwind",
    "@/ui-shared",
    "@/cms-shared",
    "styled-jsx",
  ],
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
