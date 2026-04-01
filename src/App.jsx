import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import ImageConversion from "./pages/ImageConversion"
import DocumentConversion from "./pages/DocumentConversion"
import BackgroundRemoval from "./pages/BackgroundRemoval"
import ImageCompress from "./pages/ImageCompress"
import ImagePdf from "./pages/ImagePdf"
import ImageResize from "./pages/ImageResize"
import ImageWatermark from "./pages/ImageWatermark"
import PdfDocx from "./pages/PdfDocx"
import PdfImage from "./pages/PdfImage"
import PdfMerge from "./pages/PdfMerge"
import PdfCompress from "./pages/PdfCompress"
import ContactPage from "./pages/ContactPage"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-conversion" element={<ImageConversion />}/>
        <Route path="/doc-conversion" element={<DocumentConversion />}/>
        <Route path="/bg-remove" element={<BackgroundRemoval />}/>
        <Route path="/image-compress" element={<ImageCompress />}/>
        <Route path="/image-pdf" element={<ImagePdf />}/>
        <Route path="/image-resize" element={<ImageResize />}/>
        <Route path="/image-watermark" element={<ImageWatermark />}/>
        <Route path="/pdf-docx" element={<PdfDocx />}/>
        <Route path="/pdf-image" element={<PdfImage />}/>
        <Route path="/pdf-merge" element={<PdfMerge />}/>
        <Route path="/pdf-compress" element={<PdfCompress />}/>
        <Route path="/contact-us" element={<ContactPage />}/>
      </Routes>
    </Router>
  )
}

export default App
