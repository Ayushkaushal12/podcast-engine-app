// iTunes Search API wrapper for podcast discovery
// No API key required - free to use

const BASE_URL = 'https://itunes.apple.com';

export interface Podcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  artworkUrl100: string;
  primaryGenreName: string;
  trackCount: number;
  releaseDate: string;
  collectionViewUrl: string;
  feedUrl?: string;
  contentAdvisoryRating?: string;
  country?: string;
}

export interface Episode {
  trackId: number;
  trackName: string;
  description?: string;
  releaseDate: string;
  trackTimeMillis: number;
  previewUrl?: string;
  episodeUrl?: string;
  artworkUrl60?: string;
  collectionName?: string;
}

// Search podcasts by term
export async function searchPodcasts(query: string, limit: number = 20): Promise<Podcast[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?term=${encodeURIComponent(query)}&entity=podcast&limit=${limit}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching podcasts:', error);
    return [];
  }
}

// Get podcast details by ID
export async function getPodcastById(id: string): Promise<Podcast | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/lookup?id=${id}&entity=podcast`
    );
    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error('Error fetching podcast:', error);
    return null;
  }
}

// Get podcast episodes
export async function getPodcastEpisodes(id: string, limit: number = 20): Promise<Episode[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/lookup?id=${id}&entity=podcastEpisode&limit=${limit}`
    );
    const data = await response.json();
    // First result is the podcast itself, rest are episodes
    return data.results?.slice(1) || [];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
}

// Get trending/featured podcasts by genre
export async function getTrendingPodcasts(genre: string = 'podcast', limit: number = 20): Promise<Podcast[]> {
  try {
    // Search for popular podcast terms to get varied results
    const terms = ['tech podcast', 'business podcast', 'comedy podcast', 'news podcast'];
    const randomTerm = terms[Math.floor(Math.random() * terms.length)];
    
    const response = await fetch(
      `${BASE_URL}/search?term=${encodeURIComponent(randomTerm)}&entity=podcast&limit=${limit}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trending podcasts:', error);
    return [];
  }
}

// Search podcasts by category
export async function searchByCategory(category: string, limit: number = 20): Promise<Podcast[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?term=${encodeURIComponent(category + ' podcast')}&entity=podcast&limit=${limit}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching by category:', error);
    return [];
  }
}

// Format duration from milliseconds to readable format
export function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Format date to readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
