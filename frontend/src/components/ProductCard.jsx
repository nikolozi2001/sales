import React from "react";
import { STORES } from "../constants";
import {
  extractPrice,
  calculateDiscountPercentage,
  formatPrice,
} from "../utils/helpers";
import { showProductToast, showErrorToast } from "../utils/toast";

const ProductCard = ({ product, store }) => {
  const storeInfo = STORES.find((s) => s.id === store);

  let title, image, oldPrice, newPrice, link;

  if (store === "2nabiji") {
    title = product.title;
    image = product.image;
    oldPrice = extractPrice(product.oldPrice);
    newPrice = extractPrice(product.price);
  } else if (store === "nikora") {
    title = product.name;
    image = product.img;
    oldPrice = extractPrice(product.oldPrice);
    newPrice = extractPrice(product.newPrice);
    link = product.link;
  } else if (store === "libre") {
    title = product.name;
    image = product.img;
    oldPrice = extractPrice(product.oldPrice);
    newPrice = extractPrice(product.newPrice);
    link = product.link;
  } else if (store === "libre-products") {
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
    // Here you would typically add the product to cart state/context
    showProductToast("addToCart", title || "პროდუქტი");
  };

  return (
    <article className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out">
      <div className="relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="block w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        {/* Store badge with improved styling */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${storeInfo?.color} shadow-sm`}
          ></span>
          <span className="text-xs font-semibold text-gray-700">
            {storeInfo?.name}
          </span>
        </div>

        {/* Enhanced discount badge */}
        {discountPct > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg border border-red-400/30">
            -{discountPct}%
          </div>
        )}

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-5">
        <h4 className="font-medium line-clamp-2 min-h-[2.5rem] mb-4 text-gray-800 group-hover:text-gray-900 transition-colors leading-tight">
          {title || "Product"}
        </h4>

        <div className="flex items-baseline gap-3 mb-5">
          {newPrice > 0 && (
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {formatPrice(newPrice)}
            </div>
          )}
          {oldPrice > 0 && oldPrice !== newPrice && (
            <div className="text-sm text-gray-400 line-through font-medium">
              {formatPrice(oldPrice)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleProductClick}
            disabled={!link}
            className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
              link
                ? "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm cursor-pointer"
                : "border-gray-100 text-gray-400 cursor-not-allowed bg-gray-50/50"
            }`}
          >
            დეტალურად
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-200 transform hover:scale-[1.02]"
          >
            კალათაში
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
