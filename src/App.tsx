// src/App.tsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import FloatingVideo from './pages/FloatingVideo';
import './styles/globals.css';
import ScrollToTop from './components/SrolltoTop';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <div className="min-h-screen bg-sage-bg text-sage-text">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating video mounted here — it's fixed-positioned and will appear over the page */}
        <FloatingVideo />
      </div>
    </BrowserRouter>
  );
}

export default App;
