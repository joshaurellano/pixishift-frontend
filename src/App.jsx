import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import ImageConversion from "./pages/ImageConversion"
import DocumentConversion from "./pages/DocumentConversion"
import BackgroundRemoval from "./pages/BackgroundRemoval"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-conversion" element={<ImageConversion />}/>
        <Route path="/doc-conversion" element={<DocumentConversion />}/>
        <Route path="/bg-remove" element={<BackgroundRemoval />}/>
      </Routes>
    </Router>
  )
}

export default App
