export function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-square bg-gray-300 dark:bg-gray-700" />
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-80 aspect-square bg-gray-300 dark:bg-gray-700 rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="flex gap-3">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Episodes section */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
