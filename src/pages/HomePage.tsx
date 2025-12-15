import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Sparkles } from 'lucide-react';
import { PodcastCard } from '../components/PodcastCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { CategoryFilter } from '../components/CategoryFilter';
import { getTrendingPodcasts, searchByCategory, Podcast } from '../utils/api';

export function HomePage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadPodcasts();
  }, [selectedCategory]);

  const loadPodcasts = async () => {
    setLoading(true);
    try {
      const results = selectedCategory === 'All'
        ? await getTrendingPodcasts('podcast', 24)
        : await searchByCategory(selectedCategory, 24);
      setPodcasts(results);
    } catch (error) {
      console.error('Error loading podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-4xl md:text-5xl text-gray-900 dark:text-white">
            Discover Amazing Podcasts
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore thousands of podcasts across all genres. Find your next favorite show and start listening today.
        </p>
      </motion.div>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Trending Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl text-gray-900 dark:text-white">
            {selectedCategory === 'All' ? 'Trending Podcasts' : `${selectedCategory} Podcasts`}
          </h2>
        </div>

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
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No podcasts found. Try a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
