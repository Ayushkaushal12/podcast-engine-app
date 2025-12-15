import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchResults } from './pages/SearchResults';
import { PodcastDetails } from './pages/PodcastDetails';
import { Favorites } from './pages/Favorites';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
      }`}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className="min-h-screen pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/podcast/:id" element={<PodcastDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
