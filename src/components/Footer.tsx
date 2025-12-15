import { Github, Linkedin, Twitter, Radio } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="text-gray-900 dark:text-white">PodFinder</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Discover, explore, and listen to podcasts from around the world. Your gateway to unlimited audio content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Search
                </a>
              </li>
              <li>
                <a href="/favorites" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Favorites
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/Ayushkaushal12"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/akaushal7792a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {currentYear} PodFinder. Built with React & Tailwind CSS. Made for learning purposes.</p>
        </div>
      </div>
    </footer>
  );
}
