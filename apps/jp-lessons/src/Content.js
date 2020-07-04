import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Content() {
  const [numPages, setNumPages] = useState(null);
  const location = useLocation();
  const fileName = location.pathname.split('/').pop();

  return (
    <div>
      <Document
        file={`${process.env.PUBLIC_URL}/${fileName}.pdf`}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => (
            <Page className="pdf-page" pageNumber={page} />
          ))}
      </Document>
    </div>
  );
}

export default Content;
