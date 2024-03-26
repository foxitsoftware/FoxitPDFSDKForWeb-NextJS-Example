"use client"
import { useRef, useEffect } from 'react';
import styles from "./page.module.css";
import { licenseKey, licenseSN } from '../../consts';

export default function DevGuide() {
  const elementRef = useRef();
  const pdfuiRef = useRef();
  useEffect(
    function () {
      if (!elementRef.current || !!pdfuiRef.current) {
        return;
      }
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
          url: "/FoxitPDFSDKforWeb_DeveloperGuide.pdf",
        },
      },
      { fileName: "FoxitPDFSDKforWeb_DeveloperGuide.pdf" }
    );
  }, [pdfuiRef])
  return (
    <div id="pdf-ui" className={styles.main} ref={elementRef}></div>
  );
}
