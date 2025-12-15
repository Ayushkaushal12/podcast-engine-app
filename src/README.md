# 🎙️ PodFinder - Modern Podcast Discovery App

A beautiful, fully-functional podcast discovery web application built with React, TypeScript, and Tailwind CSS. Perfect for portfolio, resume, and internship/job applications.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18+-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/typescript-5+-3178C6.svg)
![Tailwind](https://img.shields.io/badge/tailwind-4.0-38B2AC.svg)

## ✨ Features

### Core Functionality
- 🔍 **Search & Discovery**: Search podcasts by name, host, or topic
- 📂 **Category Filtering**: Filter by Technology, Business, Comedy, Health, and more
- 🎯 **Smart Sorting**: Sort by relevance, newest, or popularity
- ❤️ **Favorites System**: Save and manage your favorite podcasts (localStorage)
- 🎨 **Dark/Light Mode**: Beautiful theme switching with smooth transitions
- 📱 **Fully Responsive**: Perfect experience on mobile, tablet, and desktop

### User Experience
- ⚡ **Lightning Fast**: Optimized performance with React hooks
- 💫 **Smooth Animations**: Motion animations for delightful interactions
- 🎵 **Audio Preview**: Built-in HTML5 audio player with custom controls
- 🖼️ **Beautiful UI**: Modern, clean design with attention to detail
- ⏳ **Loading States**: Skeleton loaders for better perceived performance

### Technical Features
- 🎯 **TypeScript**: Full type safety throughout the application
- 🎨 **Tailwind CSS v4**: Cutting-edge styling with custom design tokens
- 🔄 **React Router**: Client-side routing with multiple pages
- 📦 **Component Architecture**: Reusable, maintainable components
- 🌐 **API Integration**: iTunes Search API (no key required)
- 💾 **LocalStorage**: Persistent favorites across sessions

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone or download this project**
   ```bash
   git clone <your-repo-url>
   cd podcast-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
podcast-finder/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Navbar.tsx       # Navigation with search
│   │   ├── Footer.tsx       # Footer with links
│   │   ├── PodcastCard.tsx  # Podcast display card
│   │   ├── AudioPlayer.tsx  # Custom audio player
│   │   ├── CategoryFilter.tsx # Category selection
│   │   └── LoadingSkeleton.tsx # Loading states
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx     # Landing page with trending
│   │   ├── SearchResults.tsx # Search results display
│   │   ├── PodcastDetails.tsx # Individual podcast view
│   │   └── Favorites.tsx    # Saved favorites
│   │
│   ├── utils/
│   │   └── api.ts           # API wrapper functions
│   │
│   ├── styles/
│   │   └── globals.css      # Global styles & tokens
│   │
│   └── App.tsx              # Main app component
│
├── public/                  # Static assets
├── package.json            # Dependencies
└── README.md              # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe code
- **React Router**: Client-side routing
- **Motion (Framer Motion)**: Smooth animations

### Styling
- **Tailwind CSS v4**: Utility-first CSS
- **Custom Design System**: Consistent colors & spacing
- **Dark Mode**: Built-in theme switching

### API
- **iTunes Search API**: Free podcast data (no API key needed)
- Endpoints:
  - Search podcasts
  - Get podcast details
  - Fetch episodes

### State Management
- **React Hooks**: useState, useEffect, useRef
- **LocalStorage**: Persistent favorites

## 🎯 Key Components Explained

### 1. HomePage Component
**Purpose**: Landing page with trending podcasts and category filters

**Key Features**:
- Loads trending podcasts on mount
- Category filtering system
- Grid layout with responsive design
- Loading skeleton states

**How it works**:
```typescript
- useEffect fetches podcasts on load
- CategoryFilter allows switching categories
- Maps podcast data to PodcastCard components
- Shows loading skeleton while fetching
```

### 2. SearchResults Component
**Purpose**: Display search results with sorting options

**Key Features**:
- Reads search query from URL params
- Multiple sort options (relevance, newest, popularity)
- Filter toggles
- Empty state handling

**How it works**:
```typescript
- useSearchParams gets query from URL
- searchPodcasts() fetches results
- Local sorting for different criteria
- Conditional rendering for empty/loading states
```

### 3. PodcastDetails Component
**Purpose**: Show detailed podcast information and episodes

**Key Features**:
- Loads podcast metadata and episodes
- Audio player integration
- Add/remove from favorites
- Episode list with play buttons

**How it works**:
```typescript
- useParams gets podcast ID from URL
- Parallel API calls for data
- AudioPlayer component for previews
- LocalStorage for favorites management
```

### 4. AudioPlayer Component
**Purpose**: Custom HTML5 audio player with controls

**Key Features**:
- Play/pause functionality
- Seek bar (progress slider)
- Volume control
- Skip forward/backward (10s)
- Time display

**How it works**:
```typescript
- useRef for audio element
- Event listeners for time updates
- Range inputs for seek/volume
- Format time utility function
```

### 5. PodcastCard Component
**Purpose**: Reusable card for displaying podcast info

**Key Features**:
- Podcast cover image
- Title, artist, genre
- Episode count
- Favorite toggle button
- Hover animations

**How it works**:
```typescript
- Receives props from parent
- Checks localStorage for favorite status
- Toggle adds/removes from favorites
- Motion animations on hover
```

## 🔌 API Integration

### iTunes Search API

**Base URL**: `https://itunes.apple.com`

**No API key required** - Free to use!

#### Available Functions (in `/utils/api.ts`):

1. **searchPodcasts(query, limit)**
   - Search podcasts by keyword
   - Returns array of podcast objects

2. **getPodcastById(id)**
   - Get detailed podcast information
   - Returns single podcast object

3. **getPodcastEpisodes(id, limit)**
   - Fetch episodes for a podcast
   - Returns array of episode objects

4. **getTrendingPodcasts(genre, limit)**
   - Get popular podcasts
   - Returns array of podcast objects

5. **searchByCategory(category, limit)**
   - Search by category/genre
   - Returns filtered podcasts

#### Example API Call:
```typescript
// Search for tech podcasts
const results = await searchPodcasts('technology', 20);

// Get podcast details
const podcast = await getPodcastById('123456');

// Get episodes
const episodes = await getPodcastEpisodes('123456', 50);
```

## 💾 LocalStorage Usage

### Favorites Management

**Key**: `'favorites'`  
**Format**: JSON array of podcast objects

#### Structure:
```typescript
interface FavoritePodcast {
  id: string;
  title: string;
  artist: string;
  image: string;
  genre: string;
  trackCount?: number;
}
```

#### Operations:
```typescript
// Save favorite
const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
favorites.push(newPodcast);
localStorage.setItem('favorites', JSON.stringify(favorites));

// Remove favorite
const updated = favorites.filter(fav => fav.id !== podcastId);
localStorage.setItem('favorites', JSON.stringify(updated));

// Check if favorite
const isFavorite = favorites.some(fav => fav.id === podcastId);
```

### Dark Mode Preference

**Key**: `'darkMode'`  
**Format**: Boolean

```typescript
// Save preference
localStorage.setItem('darkMode', JSON.stringify(true));

// Load preference
const darkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');
```

## 🎨 Styling System

### Tailwind CSS v4

Custom design tokens in `/styles/globals.css`:

- **Colors**: Primary, secondary, accent, background
- **Dark mode**: Automatic color switching
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized padding/margins
- **Animations**: Smooth transitions

### Key Design Choices:

1. **Purple Accent**: Primary color for CTAs and highlights
2. **Gray Scale**: Neutral backgrounds and text
3. **Shadows**: Depth and elevation
4. **Rounded Corners**: Modern, friendly appearance
5. **Hover States**: Interactive feedback

### Responsive Breakpoints:
- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

## 🎓 Learning Points

### React Concepts Demonstrated:
1. **Functional Components**: Modern React approach
2. **Hooks**: useState, useEffect, useRef
3. **Props & Type Safety**: TypeScript interfaces
4. **Component Composition**: Reusable components
5. **Conditional Rendering**: Loading/empty states
6. **Event Handling**: User interactions
7. **Side Effects**: API calls, localStorage

### Advanced Patterns:
1. **Custom Hooks**: Potential for useDebounce, useFavorites
2. **Error Boundaries**: Error handling
3. **Code Splitting**: Route-based code splitting
4. **Memoization**: Performance optimization opportunities

### Best Practices:
1. **TypeScript**: Full type safety
2. **Component Organization**: Logical file structure
3. **Reusability**: DRY principles
4. **Accessibility**: Semantic HTML, ARIA labels
5. **Performance**: Lazy loading, optimized images

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from dist/
```

## 📝 Portfolio Tips

### How to Present This Project:

1. **Live Demo**: Deploy and share the link
2. **GitHub Repo**: Clean, organized code with README
3. **Screenshots**: Show different features and pages
4. **Video Demo**: Record walkthrough of features

### Resume Description Example:
```
Built a full-stack podcast discovery web app with React, TypeScript, 
and Tailwind CSS. Implemented search, filtering, favorites system, 
and custom audio player. Features dark/light mode, responsive design, 
and smooth animations. Integrated iTunes API for real-time data.
```

### Interview Talking Points:
- Component architecture decisions
- State management approach
- API integration strategy
- Performance optimizations
- Dark mode implementation
- TypeScript benefits
- Responsive design choices

## 🔧 Customization Ideas

### Easy Modifications:
1. Add more categories
2. Change color scheme
3. Add social sharing
4. Implement user ratings
5. Add search history

### Advanced Features:
1. User authentication (Firebase, Supabase)
2. Backend API (Node.js/Express)
3. Database for user data (MongoDB, PostgreSQL)
4. Podcast player with queue
5. Recommendations algorithm
6. Comments/reviews system

## 🐛 Troubleshooting

### Common Issues:

1. **API Errors**: iTunes API is rate-limited
   - Solution: Implement debouncing

2. **LocalStorage Limits**: 5-10MB max
   - Solution: Limit favorites count

3. **CORS Issues**: Some podcast feeds blocked
   - Solution: Use proxy server

4. **Audio Playback**: Not all podcasts have previews
   - Solution: Show "No preview available" message

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)
- [Motion Documentation](https://motion.dev)

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a portfolio project demonstrating modern web development skills.

---

**Happy Coding! 🚀**

If you found this project helpful, consider starring the repository and sharing it with others!
