/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["three"]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withTM];
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...nextConfig,
  });
};
