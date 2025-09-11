import React from "react";
import { STORES } from "../constants";
import { formatPrice, calculateDiscountPercentage, extractPrice } from "../utils/helpers";

/**
 * Product Comparison Modal
 * Shows selected products side-by-side for comparison
 */
const ProductComparisonModal = ({ products, onClose, toggleFavorite, isFavorite }) => {
  if (!products || products.length === 0) return null;

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/320x240?text=No+Image";
  };

  const getProductData = (product, store) => {
    if (store === "2nabiji") {
      return {
        title: product.title,
        image: product.image,
        oldPrice: extractPrice(product.oldPrice),
        newPrice: extractPrice(product.price),
        link: null
      };
    } else {
      return {
        title: product.name,
        image: product.img,
        oldPrice: extractPrice(product.oldPrice),
        newPrice: extractPrice(product.newPrice),
        link: product.link
      };
    }
  };

  const handleProductClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handleToggleFavorite = (e, product, store) => {
    e.stopPropagation();
    toggleFavorite(product, store);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            პროდუქტების შედარება ({products.length})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="overflow-x-auto">
          <div className={`grid gap-4 p-6 ${products.length === 2 ? 'grid-cols-2' : products.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
            {products.map((item, index) => {
              const storeInfo = STORES.find(s => s.id === item.store);
              const productData = getProductData(item.product, item.store);
              const discountPct = calculateDiscountPercentage(
                productData.oldPrice,
                productData.newPrice
              );

              return (
                <div key={`${item.store}-${index}`} className="bg-gray-50 rounded-xl p-4">
                  {/* Store Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-block h-3 w-3 rounded-full ${storeInfo?.color}`}></span>
                    <span className="text-sm font-semibold text-gray-700">
                      {storeInfo?.name}
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="relative mb-3">
                    {productData.image ? (
                      <img
                        src={productData.image}
                        alt={productData.title}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => handleToggleFavorite(e, item.product, item.store)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md ${
                        isFavorite(item.product, item.store)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>

                    {/* Discount Badge */}
                    {discountPct > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{discountPct}%
                      </div>
                    )}
                  </div>

                  {/* Product Title */}
                  <h4 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {productData.title || "Product"}
                  </h4>

                  {/* Price Information */}
                  <div className="space-y-1 mb-3">
                    {productData.newPrice > 0 && (
                      <div className="text-lg font-bold text-green-600">
                        {formatPrice(productData.newPrice)}
                      </div>
                    )}
                    {productData.oldPrice > 0 && productData.oldPrice !== productData.newPrice && (
                      <div className="text-sm text-gray-400 line-through">
                        {formatPrice(productData.oldPrice)}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleProductClick(productData.link)}
                    disabled={!productData.link}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      productData.link
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {productData.link ? "დეტალურად" : "ლინკი არ არის"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparisonModal;
