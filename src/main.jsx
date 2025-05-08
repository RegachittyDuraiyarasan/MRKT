import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route,BrowserRouter } from "react-router-dom";
import Navbar from './component/pages/Navbar';
import Footer from './component/pages/Footer';
import LandingPage from './component/pages/LandingPage';
import Carousel from './component/pages/Carousel';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

export const BASE_URL = "https://mrkt.houseofwebsites.com/public";

createRoot(document.getElementById('root')).render(
  <>
        <BrowserRouter>
            <Routes>
                <Route path="/nav" element={<Navbar />} />
                <Route path="/footer" element={<Footer />} />
                <Route path="/carousel" element={<Carousel />} />
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    </>
)
