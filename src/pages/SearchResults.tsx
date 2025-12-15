import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PodcastCard } from '../components/PodcastCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { searchPodcasts, Podcast } from '../utils/api';

type SortOption = 'relevance' | 'newest' | 'rating';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query) {
      loadSearchResults();
    }
  }, [query]);

  useEffect(() => {
    sortPodcasts();
  }, [sortBy]);

  const loadSearchResults = async () => {
    setLoading(true);
    try {
      const results = await searchPodcasts(query, 50);
      setPodcasts(results);
    } catch (error) {
      console.error('Error searching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortPodcasts = () => {
    const sorted = [...podcasts];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'rating':
        // iTunes API doesn't provide ratings, so we'll sort by track count as a proxy for popularity
        sorted.sort((a, b) => (b.trackCount || 0) - (a.trackCount || 0));
        break;
      case 'relevance':
      default:
        // Keep original order (relevance from API)
        break;
    }
    
    setPodcasts(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-3xl text-gray-900 dark:text-white">
            Search Results
          </h1>
        </div>
        {query && (
          <p className="text-gray-600 dark:text-gray-400">
            Showing results for: <span className="text-purple-600 dark:text-purple-400">"{query}"</span>
            {!loading && ` (${podcasts.length} found)`}
          </p>
        )}
      </motion.div>

      {/* Filters & Sort */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </motion.button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="rating">Most Popular</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Additional filters coming soon...
            </p>
          </motion.div>
        )}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <LoadingSkeleton count={12} />
        </div>
      ) : podcasts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {podcasts.map((podcast) => (
            <PodcastCard
              key={podcast.collectionId}
              id={podcast.collectionId.toString()}
              title={podcast.collectionName}
              artist={podcast.artistName}
              image={podcast.artworkUrl600}
              genre={podcast.primaryGenreName}
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
          <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl text-gray-900 dark:text-white mb-2">
            No podcasts found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Try searching with different keywords or browse categories on the home page.
          </p>
        </motion.div>
      )}
    </div>
  );
}
