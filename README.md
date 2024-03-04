# FoxitPDFSDK for Web Example - Next.js

These guides are divided into two parts:

- [Part 1: How to run this example](#part-1-how-to-run-this-example)
- [Part 2: How to use FoxitPDFSDK for Web in Next.js](#part-2-how-to-use-foxitpdfsdk-for-web-in-nextjs)

## Prerequisites

- [Node.js](https://nodejs.org/en) and [npm](https://docs.npmjs.com/getting-started)
- @foxitsoftware/foxit-pdf-sdk-for-web-library >= 9.0.0

## Part 1: How to run this example

### 1. Clone the repository

```shell
git clone git@github.com:foxitsoftware/FoxitPDFSDKForWeb-NextJS-Example.git nextjs-websdk
```

### 2. Enter the directory and run npm install

```shell
cd nextjs-websdk
npm install
```

### 3. Update the licenseSN and licenseKey values in `nextjs-websdk/src/pages/index.js` with your own licenseSN and licenseKey that you received from sales

### 4. Run project

- Development mode:

```shell
npm run dev
```

- Production mode:

```shell
npm run build
npm run start
```

### 5. Start snapshot serve

Navigate to `nextjs-websdk/public/FoxitPDFSDKForWeb/server/snapshot`, and execute:

```shell
npm install
npm run start
```

## Part 2: How to use FoxitPDFSDK for Web in Next.js

### 1. Create project

Execute the command `npx create-next-app@latest` and follow the wizard to complete the setup:

- project name -> nextjs-websdk
- use TypeScript -> No
- use ESLint -> No
- use `src/` directory -> Yes
- use experimental `app/` directory -> No
- import alias -> Type Enter key

### 2. Install dependence

```shell
cd nextjs-websdk
npm install @foxitsoftware/foxit-pdf-sdk-for-web-library copy-webpack-plugin
```

### 3. Update `nextjs-websdk/src/pages/index.js` to follow

```jsx
import Head from 'next/head';
import {useEffect} from 'react';

export default function Home() {
  useEffect(function () {
    const licenseSN = 'xxx';
    const licenseKey = 'xxx';

    const readyWorker = preloadJrWorker({
      workerPath: '/FoxitPDFSDKForWeb/lib/',
      enginePath: '../lib/jr-engine/gsdk',
      fontPath: 'http://webpdf.foxitsoftware.com/webfonts/',
      licenseSN: licenseSN,
      licenseKey: licenseKey
    });

    const PDFUI = UIExtension.PDFUI;
    const pdfui = new PDFUI({
      viewerOptions: {
        libPath: '/FoxitPDFSDKForWeb/lib',
        jr: {
          readyWorker: readyWorker
        }
      },
      renderTo: '#pdf-ui',
      appearance: UIExtension.appearances.adaptive,
      fragments: [],
      addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ?
        '/FoxitPDFSDKForWeb/lib/uix-addons/allInOne.mobile.js':
        '/FoxitPDFSDKForWeb/lib/uix-addons/allInOne.js'
    });
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/FoxitPDFSDKForWeb/lib/UIExtension.css"/>
        <script src="/FoxitPDFSDKForWeb/lib/UIExtension.full.js"></script>
        <script src="/FoxitPDFSDKForWeb/lib/preload-jr-worker.js"></script>
        <title>FoxitPDFSDKForWeb Next.js Example</title>
      </Head>

      <style jsx>{`
        :global {
          html {
            overflow: hidden;
          }
          body {
            height: 100vh;
          }
        }
        #pdf-ui {
          top: 40px;
          bottom: 0;
          position: absolute;
          width: 100vw;
        }
      `}</style>

      <div className="fv__ui-nav">
        <div className="fv__ui-nav-logo">
          <i className="fv__icon-logo"></i>
        </div>
      </div>
      <div id="pdf-ui"></div>
    </>
  )
}

```

### 4. Update the licenseSN and licenseKey values in `nextjs-websdk/src/pages/index.js` with your own licenseSN and licenseKey that you received from sales

### 5. Update `nextjs-websdk/next.config.js` to follow

```js
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
            force: true,
            info: {minimized: true},
          },
          {
            from: path.resolve(libraryModulePath, 'server'),
            to: path.resolve(__dirname, 'public/FoxitPDFSDKForWeb/server'),
            force: true,
            info: {minimized: true},
          }
        ]
      }),
    );
    return config;
  }
}

module.exports = nextConfig
```

### 6. Update `nextjs-websdk/src/pages/_app.js` to remove Next.js default global style

```diff
- import '@/styles/globals.css'
+ // import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

### 7. Run project

- Development mode:

```shell
npm run dev
```

- Production mode:

```shell
npm run build
npm run start
```

### 8. Start snapshot serve

Navigate to `nextjs-websdk/public/FoxitPDFSDKForWeb/server/snapshot`, and execute:

```shell
npm install
npm run start
```
