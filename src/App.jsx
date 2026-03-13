import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Home from "./pages/home"
import ImageConversion from "./pages/imageConversion"
import DocumentConversion from "./pages/documentConversion"
import BackgroundRemoval from "./pages/backgroundRemoval"

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
