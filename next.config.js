/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["node-appwrite"],
  },
  webpack(config) {
    const webpack = require("webpack");

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^isomorphic-form-data$/,
        `${config.context}/form-data-mock.js`,
      ),
    );

    return config;
  },
};

module.exports = nextConfig;
