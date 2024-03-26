import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="/FoxitPDFSDKForWeb/lib/UIExtension.css"
        />
        <script src="/FoxitPDFSDKForWeb/lib/UIExtension.full.js"></script>
        <script src="/FoxitPDFSDKForWeb/lib/preload-jr-worker.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}