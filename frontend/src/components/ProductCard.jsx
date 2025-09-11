import React from "react";
import { STORES } from "../constants";
import {
  extractPrice,
  calculateDiscountPercentage,
  formatPrice,
} from "../utils/helpers";
import { showProductToast, showErrorToast } from "../utils/toast";
import { useFavorites } from "../hooks/useProductFilters";

// Price Change Indicator Component
const PriceChangeIndicator = ({ oldPrice, newPrice }) => {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) return null;

  const change = ((newPrice - oldPrice) / oldPrice) * 100;
  const isIncrease = change > 0;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
        isIncrease
          ? "bg-red-100 text-red-600 border border-red-200"
          : "bg-green-100 text-green-600 border border-green-200"
      }`}
    >
      <span>{isIncrease ? "↗" : "↘"}</span>
      <span>{Math.abs(change).toFixed(1)}%</span>
    </div>
  );
};

const ProductCard = ({ product, store, toggleFavorite: toggleFav, isFavorite: isFav }) => {
  const storeInfo = STORES.find((s) => s.id === store);
  // Use provided functions or fallback to hook
  const { toggleFavorite: hookToggle, isFavorite: hookIsFav } = useFavorites();
  const toggleFavorite = toggleFav || hookToggle;
  const isFavorite = isFav || hookIsFav;

  let title, image, oldPrice, newPrice, link;

  if (store === "2nabiji") {
    title = product.title;
    image = product.image;
    oldPrice = extractPrice(product.oldPrice);
    newPrice = extractPrice(product.price);
  } else {
    title = product.name;
    image = product.img;
    oldPrice = extractPrice(product.oldPrice);
    newPrice = extractPrice(product.newPrice);
    link = product.link;
  }

  const discountPct = calculateDiscountPercentage(oldPrice, newPrice);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/320x240?text=No+Image";
  };

  const handleProductClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
      showProductToast("view", title || "პროდუქტი");
    } else {
      showErrorToast("ლინკი მიუწვდომელია");
    }
  };

  const handleAddToCart = () => {
    showProductToast("addToCart", title || "პროდუქტი");
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product, store);
    const isFav = isFavorite(product, store);
    showProductToast(
      isFav ? "removeFavorite" : "addFavorite",
      title || "პროდუქტი"
    );
  };

  return (
    <article className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-300 ease-out">
      <div className="relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="block w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        {/* Store badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md border border-gray-100">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${storeInfo?.color}`}
          ></span>
          <span className="text-[11px] font-semibold text-gray-700">
            {storeInfo?.name}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md border transition-all duration-200 ${
            isFavorite(product, store)
              ? "bg-red-500 text-white border-red-400 hover:bg-red-600"
              : "bg-white/95 text-gray-400 border-gray-200 hover:text-red-500 hover:bg-gray-50"
          }`}
          title={
            isFavorite(product, store)
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <svg
            className="w-4 h-4"
            fill={isFavorite(product, store) ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Discount badge */}
        {discountPct > 0 && (
          <div className="absolute top-3 right-14 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-md">
            -{discountPct}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h4 className="font-medium line-clamp-2 min-h-[2.8rem] mb-3 text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
          {title || "Product"}
        </h4>

        <div className="flex items-center gap-2 mb-4">
          {newPrice > 0 && (
            <div className="text-xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {formatPrice(newPrice)}
            </div>
          )}
          {oldPrice > 0 && oldPrice !== newPrice && (
            <div className="text-sm text-gray-400 line-through font-medium">
              {formatPrice(oldPrice)}
            </div>
          )}
          <PriceChangeIndicator oldPrice={oldPrice} newPrice={newPrice} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleProductClick}
            disabled={!link}
            className={`flex-1 px-4 py-2.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
              link
                ? "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm cursor-pointer"
                : "border-gray-100 text-gray-400 cursor-not-allowed bg-gray-50/50"
            }`}
          >
            დეტალურად
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-200 transform hover:scale-[1.02]"
          >
            კალათაში
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
