import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Radio, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        isDarkMode
          ? 'bg-gray-800/90 border-gray-700'
          : 'bg-white/90 border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Radio className={`w-8 h-8 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </motion.div>
            <span className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              PodFinder
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search podcasts, hosts, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/favorites">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
