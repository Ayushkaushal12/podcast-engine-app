import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, ExternalLink, Play, Clock, Heart } from 'lucide-react';
import { getPodcastById, getPodcastEpisodes, formatDate, formatDuration, Podcast, Episode } from '../utils/api';
import { DetailsSkeleton } from '../components/LoadingSkeleton';
import { AudioPlayer } from '../components/AudioPlayer';

export function PodcastDetails() {
  const { id } = useParams<{ id: string }>();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadPodcastDetails();
      checkFavorite();
    }
  }, [id]);

  const checkFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: any) => fav.id === id));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const updated = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else if (podcast) {
      const newFavorite = {
        id: podcast.collectionId.toString(),
        title: podcast.collectionName,
        artist: podcast.artistName,
        image: podcast.artworkUrl600,
        genre: podcast.primaryGenreName,
        trackCount: podcast.trackCount
      };
      localStorage.setItem('favorites', JSON.stringify([...favorites, newFavorite]));
      setIsFavorite(true);
    }
  };

  const loadPodcastDetails = async () => {
    setLoading(true);
    try {
      const [podcastData, episodesData] = await Promise.all([
        getPodcastById(id!),
        getPodcastEpisodes(id!, 50)
      ]);
      setPodcast(podcastData);
      setEpisodes(episodesData);
    } catch (error) {
      console.error('Error loading podcast details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DetailsSkeleton />
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-900 dark:text-white mb-4">
            Podcast not found
          </h2>
          <Link
            to="/"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/">
        <motion.button
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>
      </Link>

      {/* Podcast Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={podcast.artworkUrl600}
            alt={podcast.collectionName}
            className="w-full md:w-80 aspect-square object-cover rounded-xl shadow-lg"
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
              {podcast.collectionName}
            </h1>

            <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{podcast.artistName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(podcast.releaseDate)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm">
                {podcast.primaryGenreName}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
                {podcast.trackCount} episodes
              </span>
              {podcast.contentAdvisoryRating && (
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
                  {podcast.contentAdvisoryRating}
                </span>
              )}
            </div>

            <div className="flex gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </motion.button>

              {podcast.collectionViewUrl && (
                <a
                  href={podcast.collectionViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View in iTunes
                  </motion.button>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Audio Player */}
      {selectedEpisode && selectedEpisode.previewUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <AudioPlayer
            src={selectedEpisode.previewUrl}
            title={selectedEpisode.trackName}
            onEnded={() => setSelectedEpisode(null)}
          />
        </motion.div>
      )}

      {/* Episodes List */}
      <div>
        <h2 className="text-2xl text-gray-900 dark:text-white mb-6">
          Episodes ({episodes.length})
        </h2>

        {episodes.length > 0 ? (
          <div className="space-y-4">
            {episodes.map((episode, index) => (
              <motion.div
                key={episode.trackId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {episode.artworkUrl60 && (
                    <img
                      src={episode.artworkUrl60}
                      alt={episode.trackName}
                      className="w-16 h-16 rounded-lg"
                    />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 dark:text-white mb-2">
                      {episode.trackName}
                    </h3>
                    
                    {episode.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {episode.description.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(episode.releaseDate)}
                      </div>
                      {episode.trackTimeMillis && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDuration(episode.trackTimeMillis)}
                        </div>
                      )}
                    </div>
                  </div>

                  {episode.previewUrl && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedEpisode(episode)}
                      className="flex-shrink-0 p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    >
                      <Play className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              No episodes available for this podcast.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
