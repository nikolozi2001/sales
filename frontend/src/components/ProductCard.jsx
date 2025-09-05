import React from "react";
import { STORES } from "../constants";
import {
  extractPrice,
  calculateDiscountPercentage,
  formatPrice,
} from "../utils/helpers";

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
  }

  const discountPct = calculateDiscountPercentage(oldPrice, newPrice);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/320x240?text=No+Image";
  };

  const handleProductClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-200">
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

        {/* Store badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${storeInfo?.color}`}
          ></span>
          <span className="text-xs font-medium text-gray-600">
            {storeInfo?.name}
          </span>
        </div>

        {/* Discount badge */}
        {discountPct > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
            -{discountPct}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem] mb-3 text-gray-800">
          {title || "Product"}
        </h3>

        <div className="flex items-baseline gap-3 mb-4">
          {newPrice > 0 && (
            <div className="text-lg font-bold text-emerald-600">
              {formatPrice(newPrice)}
            </div>
          )}
          {oldPrice > 0 && oldPrice !== newPrice && (
            <div className="text-sm text-gray-400 line-through">
              {formatPrice(oldPrice)}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleProductClick}
            disabled={!link}
            className={`flex-1 px-3 py-1.5 rounded-md border text-sm transition-colors ${
              link
                ? "border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
                : "border-gray-100 text-gray-400 cursor-not-allowed bg-gray-50"
            }`}
          >
            დეტალურად
          </button>
          <button className="flex-1 px-3 py-1.5 rounded-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-medium hover:from-emerald-700 hover:to-teal-700 transition-colors">
            კალათაში
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
