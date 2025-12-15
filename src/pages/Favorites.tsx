import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Trash2 } from 'lucide-react';
import { PodcastCard } from '../components/PodcastCard';

interface FavoritePodcast {
  id: string;
  title: string;
  artist: string;
  image: string;
  genre: string;
  trackCount?: number;
}

export function Favorites() {
  const [favorites, setFavorites] = useState<FavoritePodcast[]>([]);

  useEffect(() => {
    loadFavorites();
    
    // Listen for storage changes (when favorites are updated from other components)
    const handleStorageChange = () => {
      loadFavorites();
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener('favoritesUpdated', loadFavorites);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', loadFavorites);
    };
  }, []);

  const loadFavorites = () => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  };

  const clearAllFavorites = () => {
    if (confirm('Are you sure you want to remove all favorites?')) {
      localStorage.setItem('favorites', JSON.stringify([]));
      setFavorites([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <div>
              <h1 className="text-3xl text-gray-900 dark:text-white">
                My Favorites
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {favorites.length} podcast{favorites.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>

          {favorites.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFavorites}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Favorites Grid */}
      {favorites.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {favorites.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              id={podcast.id}
              title={podcast.title}
              artist={podcast.artist}
              image={podcast.image}
              genre={podcast.genre}
              trackCount={podcast.trackCount}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Heart className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl text-gray-900 dark:text-white mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start exploring and add podcasts to your favorites!
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            Discover Podcasts
          </a>
        </motion.div>
      )}
    </div>
  );
}
