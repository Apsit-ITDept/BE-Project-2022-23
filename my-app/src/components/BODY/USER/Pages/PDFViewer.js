import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "../static/PDFViewer.module.css";
import resume from '../static/Pdfs/OmkarCV.pdf'

export default function PDFViewer() {
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageScale, setPageScale] = useState(1);
  return (
    <div className={styles.displayCV}>
      <div className={styles.cvContainer}>
        <PDFDisplay
          setTotalPages={setTotalPages}
          pageNumber={pageNumber}
          pageScale={pageScale}
        />
      </div>
      <div className={styles.navigatorButtons}>
        <PDFNavigation
          totalPages={totalPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageScale={pageScale}
          setPageScale={setPageScale}
        />
      </div>
    </div>
  );
}

function PDFNavigation({
  totalPages,
  pageNumber,
  setPageNumber,
  pageScale,
  setPageScale,
}) {
  function handleZoomIn() {
    if (pageScale < 3) {
      setPageScale(pageScale + 0.2);
    }
  }

  function handleZoomOut() {
    if (pageScale > 0.3) {
      setPageScale(pageScale - 0.2);
    }
  }

  function handleNext() {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  }
  function handlePrevious() {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  }
  return (
    <div className={styles.footer}>
      <div className={styles.buttonContainer}>
        <button onClick={handleZoomIn} disabled={pageScale >= 3}>
          Zoom +
        </button>
        <button onClick={handleZoomOut} disabled={pageScale <= 0.3}>
          Zoom -
        </button>
      </div>
      <div className="page-text">
        Page {pageNumber} of {totalPages}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handlePrevious} disabled={pageNumber === 1}>
          ‹ Previous
        </button>
        <button onClick={handleNext} disabled={pageNumber === totalPages}>
          Next ›
        </button>
      </div>
    </div>
  );
}

function PDFDisplay({ setTotalPages, pageNumber, pageScale }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const url =
    "https://cors-anywhere.herokuapp.com/https://ncu.rcnpv.com.tw/Uploads/20131231103232738561744.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages);
  }
  return (
    <div className={styles.pdfviewer}>
      <div className={styles.pageContainer}>
        <Document file={resume} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            scale={pageScale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
