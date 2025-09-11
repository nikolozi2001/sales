import React from "react";
import ProductCard from "./ProductCard";

/**
 * Favorites Section Component
 * Displays favorited products in a dedicated section
 */
const FavoritesSection = ({
  favorites,
  removeFavorite,
  loading,
  toggleFavorite,
  isFavorite,
  showSelection = false,
  selectedProducts = [],
  onSelectionChange,
}) => {
  if (loading) {
    return (
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">ფავორიტები</h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-gray-500 mt-2">იტვირთება...</p>
        </div>
      </section>
    );
  }

  if (favorites.length === 0) {
    return (
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">ფავორიტები</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">ჯერ არ გაქვთ ფავორიტები</h3>
          <p className="text-gray-500">პროდუქტებზე გულის ღილაკზე დაჭერით დაამატეთ ფავორიტებში</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">ფავორიტები</h2>
          <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
            {favorites.length}
          </span>
        </div>
        <button
          onClick={() => {
            if (window.confirm('გსურთ ყველა ფავორიტის წაშლა?')) {
              favorites.forEach(fav => removeFavorite(fav.key));
            }
          }}
          className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline"
        >
          ყველას წაშლა
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((favorite) => {
          const isSelected = selectedProducts.some(
            selected => {
              // For favorites, compare by store and unique identifier
              if (favorite.store === "2nabiji") {
                return selected.store === favorite.store && selected.product.title === favorite.title;
              } else {
                return selected.store === favorite.store && (selected.product.link === favorite.link || selected.product.name === favorite.name);
              }
            }
          );

          return (
            <ProductCard
              key={favorite.key}
              product={favorite}
              store={favorite.store}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              showSelection={showSelection}
              isSelected={isSelected}
              onSelectionChange={onSelectionChange}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FavoritesSection;
