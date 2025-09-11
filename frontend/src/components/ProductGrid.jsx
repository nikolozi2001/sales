import React from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

// Product Skeleton Component for loading states
const ProductSkeleton = () => (
  <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="relative overflow-hidden">
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300" />
      {/* Top-left badge */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          <div className="h-3 w-12 bg-gray-300 rounded" />
        </div>
      </div>
      {/* Top-right discount */}
      <div className="absolute top-3 right-3 bg-gray-300 px-3 py-1.5 rounded-xl" />
    </div>
    <div className="p-5">
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="flex items-baseline gap-3 mb-5">
        <div className="h-6 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-12" />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
        <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  </article>
);

const ProductGrid = ({
  products,
  loading,
  error,
  currentPage,
  setCurrentPage,
  totalPages,
  isFiltering,
  toggleFavorite,
  isFavorite,
  showSelection = false,
  selectedProducts = [],
  onSelectionChange,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto mt-10 bg-red-50 border border-red-200 rounded-2xl text-center shadow-sm">
        <ErrorMessage error={error} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-12 text-center bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="mb-5">
          <svg
            className="w-16 h-16 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 12H9m6-4H9m3 8h.01M12 2a10 10 0 00-7.07 17.07L12 22l7.07-2.93A10 10 0 0012 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          ფასდაკლებები არ მოიძებნა
        </h3>
        <p className="text-gray-500 mb-4">
          სცადეთ სხვა საძიებო ტერმინი ან შეცვალეთ ფილტრები
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:shadow-sm transition-all"
        >
          განახლება
        </button>
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      {isFiltering && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
          <LoadingSpinner />
        </div>
      )}
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item, index) => {
          const isSelected = selectedProducts.some(
            selected => {
              // For regular products, compare by store and a unique identifier
              if (item.store === "2nabiji") {
                return selected.store === item.store && selected.product.title === item.product.title;
              } else {
                return selected.store === item.store && (selected.product.link === item.product.link || selected.product.name === item.product.name);
              }
            }
          );

          return (
            <ProductCard
              key={`${item.store}-${item.product.id || index}`}
              product={item.product}
              store={item.store}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              showSelection={showSelection}
              isSelected={isSelected}
              onSelectionChange={onSelectionChange}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ◀ წინა
          </button>
          <span className="text-sm font-medium text-gray-700">
            გვერდი {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            შემდეგი ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
