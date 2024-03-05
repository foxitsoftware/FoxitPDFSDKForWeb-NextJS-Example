import Head from "next/head";
import { useEffect, useRef } from "react";


export default function Home() {
  const elementRef = useRef();
  const pdfuiRef = useRef();
  useEffect(
    function () {
      if (!elementRef.current || !!pdfuiRef.current) {
        return;
      }
      const licenseSN = "xxx";
      const licenseKey = "xxx";
      const readyWorker = preloadJrWorker({
        workerPath: "/FoxitPDFSDKForWeb/lib/",
        enginePath: "../lib/jr-engine/gsdk",
        fontPath: "http://webpdf.foxitsoftware.com/webfonts/",
        licenseSN: licenseSN,
        licenseKey: licenseKey,
      });
      const PDFUI = UIExtension.PDFUI;
      const pdfui = new PDFUI({
        viewerOptions: {
          libPath: "/FoxitPDFSDKForWeb/lib",
          jr: {
            readyWorker: readyWorker,
          },
        },
        renderTo: elementRef.current,
        appearance: UIExtension.appearances.adaptive,
        fragments: [],
        addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile
          ? "/FoxitPDFSDKForWeb/lib/uix-addons/allInOne.mobile.js"
          : "/FoxitPDFSDKForWeb/lib/uix-addons/allInOne.js",
      });
      pdfuiRef.current = pdfui;
    },
    [elementRef]
  );
  useEffect(() => {
    if(!pdfuiRef.current) {
      return;
    }
    const pdfui = pdfuiRef.current;
    pdfui.openPDFByHttpRangeRequest(
      {
        range: {
          url: "/FoxitPDFSDKforWeb_DemoGuide.pdf",
        },
      },
      { fileName: "FoxitPDFSDKforWeb_DemoGuide.pdf" }
    );
  }, [pdfuiRef])
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="/FoxitPDFSDKForWeb/lib/UIExtension.css"
        />
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
      <div id="pdf-ui" ref={elementRef}></div>
    </>
  );
}
