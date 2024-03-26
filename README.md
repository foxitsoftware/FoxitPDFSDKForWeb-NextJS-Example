# Integrating Foxit PDF SDK for Web with Next.js (with app router)

This is a minimal example project that demonstrates how to integrate the [Foxit PDF SDK for Web](https://developers.foxit.com/products/pdf-sdk/) into a Next.js application. The project was created using `create-next-app` and is designed to serve as a starting point for developers who want to add PDF viewing and annotation capabilities to their Next.js applications.

## Getting Started

You have two options to get started with this example:

1. **Use this project as a boilerplate**: If you want to use this project as a boilerplate, you can clone this repository and start building on top of it. This approach allows you to add features like App Router or make any other modifications you need.

2. **Start from scratch**: If you prefer to start from scratch, you can create a new Next.js project using `create-next-app` and integrate the Foxit PDF SDK for Web into your new project.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version specified in the project's `.nvmrc`)
- [npm](https://www.npmjs.com/) (usually comes bundled with Node.js)

### Use as boilerplate

1. **Clone the repository:**

    ```bash
    git clone git@github.com:foxitsoftware/FoxitPDFSDKForWeb-NextJS-Example.git --branch app-router --single-branch nextjs-websdk
    ```

1. **Install dependencies:**

    ```bash
    cd nextjs-websdk
    npm install
    ```

1. **Obtain license key:**

    To use the Foxit PDF SDK for Web, you need to obtain licence key from our [sales](https://developers.foxit.com/contact/). Once you have the license key, update the `licenseSN` and `licenseKey` values defined in `src/app/consts.js`.

1. **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start the Next.js development server, and you can access the application at <http://localhost:3000>.

### Start from scratch

The official Next.js documentation suggests creating a new project via `create-next-app`. To create a project, run:

```bash
npx create-next-app@latest
```

On installation, you'll see the following prompts:

```log
What is your project named? nextjs-websdk
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

After the prompts, `create-next-app` will create a folder with your project name and install required dependencies.

**Please note that in the current example, the App Router function needs to be enabled. Therefore, when prompted whether to use App Router, please select "Yes"**。

From here, you can refer to the later section [Integrating into your own project](#integrating-into-your-own-project) to integrate Foxit PDF SDK for Web into your project.

For more details on how to create a Next.js project, we recommend that you refer to the Next js official documentation:

> <https://www.npmjs.com/package/create-next-app>
> <https://nextjs.org/docs/getting-started/installation>
> <https://nextjs.org/docs/app/building-your-application/routing>

## Integrating into your own project

### Installation

Install the Foxit PDF SDK for Web into your project using following command:

```bash
npm install @foxitsoftware/foxit-pdf-sdk-for-web-library
```

And then, install `copy-webpack-plugin` as develop dependency:

```bash
npm install -D copy-webpack-plugin
```

This will be used to configure webpack to copy the static resources of Foxit PDF SDK for Web into public directory.

### Modify Next.js Configuration

Due to the Foxit PDF SDK for Web requiring additional static resources during runtime, you need to configure Next.js webpack settings. In your *next.config.mjs* file, add the following webpack configuration:

```js
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
const libraryModulePath = path.resolve('node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(libraryModulePath, 'lib'),
            to: path.resolve('./public/FoxitPDFSDKForWeb/lib'),
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
```

This configuration uses *copy-webpack-plugin* to copy static resources from `node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/lib` to the `public/FoxitPDFSDKForWeb/lib` directory.

**Note:**

> Prior to `create-next-app@14.1.0`, the configuration file was named `next.config.js` (Refer to this PR: <https://github.com/vercel/next.js/pull/60494>),
> and should be written in CommonJS style.
>

### Apply Foxit PDF SDK for Web in Next.js

In your Next.js components or pages where you want to use the PDF SDK, import the necessary modules and initialize the SDK as needed.

Here's a basic example of how you might integrate the PDF SDK into a Next.js component, with the key steps demonstrated in the following simplified code:

```js
function DemoGuide() {
    const elementRef = useRef();
    const pdfuiRef = useRef();
    useEffect(() => {
        // Determine if the element instance is available
        if(!elementRef.current) {
            return;
        }
        // Avoid PDFUI instances from being initialized multiple times in the same page
        if(!!pdfuiRef.current) {
            return;
        }
        const pdfui = new UIExtension.PDFUI({
            // ...
        });
        // Save PDFUI instance to pdfuiRef
        pdfuiRef.current = pdfui;
    }, [elementRef])
    
    return (<>
        { /* ... */ }
        <div ref={elementRef}></div>
        { /* ... */ }
    </>
    )
}
```

For completed implementation, please refer to the code in `src/app/examples` directory.

In this example, for the convenience of demonstration, we directly save the PDFUI instance on `Ref`. In actual development, we recommend saving the PDFUI instance on `Context`, which makes it easier to share PDFUI instances among different components.

For more information about the usage of Foxit PDF SDK for Web, please refer to the official documentation.

> Developer Guide: <https://webviewer-demo.foxit.com/docs/developer-guide>
>
> API Reference: <https://webviewer-demo.foxit.com/docs/api_reference/html/index.html>

## External services

The Foxit PDF SDK for Web offers various external services, including the snapshot service and the signature service (available in Linux and Windows versions). These services are located in the server directory. Below, we take the snapshot service as an example to explain how to configure and use these services in Next.js.

### Modify Next.js Configuration Again

First, based on the configuration mentioned above, we add the `copy-webpack-plugin` configuration to copy the server directory into the deployment directory:

```js
const nextConfig = {
  // ...
  webpack: (config, options) => {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          // ...
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
```

Next, we configure the proxy to prevent cross-origin requests between the frontend and the server:

```js
const nextConfig = {
    async rewrites() {
    return [
      {
        source: '/snapshot/:path*',
        destination: 'http://localhost:3002/snapshot/:path*',
      },
    ]
  },
  // ...
}
```

For the complete configuration, please refer to [next.config.mjs](./next.config.mjs).

After modifying the above configurations, we run `npm run dev` to start the development server, and open `http://localhost:3000` in the browser. Next.js will automatically start webpack, and the `node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/server` directory will be automatically copied to `public/FoxitPDFSDKForWeb/server`, while requests from `http://localhost:3000/snapshot/:path` will be proxied to `http://localhost:3002/snapshot/:path`.

### Start snapshot server

Navigate to `public/FoxitPDFSDKForWeb/server/snapshot`, and execute the following command:

```shell
npm install
npm run start
```

After completing these operations, we can use the snapshot functionality.
