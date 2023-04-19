const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const libraryModulePath = path.resolve('node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/snapshot/:path*',
        destination: 'http://localhost:3002/snapshot/:path*',
      },
    ]
  },
  webpack: (config, options) => {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(libraryModulePath, 'lib'),
            to: path.resolve(__dirname, 'public/FoxitPDFSDKForWeb/lib'),
            force: true
          },
          {
            from: path.resolve(libraryModulePath, 'server'),
            to: path.resolve(__dirname, 'public/FoxitPDFSDKForWeb/server'),
            force: true
          }
        ]
      }),
    );
    return config;
  }
}

module.exports = nextConfig
