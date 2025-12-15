import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, PlayCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PodcastCardProps {
  id: string;
  title: string;
  artist: string;
  image: string;
  genre: string;
  trackCount?: number;
  releaseDate?: string;
}

export function PodcastCard({ id, title, artist, image, genre, trackCount }: PodcastCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: any) => fav.id === id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const updated = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const newFavorite = { id, title, artist, image, genre, trackCount };
      localStorage.setItem('favorites', JSON.stringify([...favorites, newFavorite]));
      setIsFavorite(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/podcast/${id}`}>
        <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <PlayCircle className="w-16 h-16 text-white" />
            </div>

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg z-10"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
              {artist}
            </p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                {genre}
              </span>
              {trackCount && (
                <span className="text-gray-500 dark:text-gray-400">
                  {trackCount} episodes
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
