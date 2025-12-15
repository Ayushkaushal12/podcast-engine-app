import { motion } from 'motion/react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  'All',
  'Technology',
  'Business',
  'Comedy',
  'Education',
  'Health & Fitness',
  'Music',
  'News',
  'Sports',
  'True Crime',
  'Science',
  'Arts'
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h2 className="text-gray-900 dark:text-white mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
