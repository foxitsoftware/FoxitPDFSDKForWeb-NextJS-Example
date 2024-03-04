import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
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
            to: path.resolve('./public/FoxitPDFSDKForWeb/lib'),
            force: true,
            info: {minimized: true},
          },
          {
            from: path.resolve(libraryModulePath, 'server'),
            to: path.resolve('./public/FoxitPDFSDKForWeb/server'),
            force: true,
            info: {minimized: true},
          }
        ]
      }),
    );
    return config;
  }
}

export default nextConfig;