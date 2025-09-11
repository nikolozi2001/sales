import React, { useState } from "react";
import { showErrorToast } from "../utils/toast";

/**
 * Quick Actions Menu Component
 * Provides bulk operations for selected products
 */
const QuickActionsMenu = ({
  selectedProducts,
  onClearSelection,
  onBulkAddToCart,
  onCompare,
  onShare,
  onExportFavorites,
  favoritesCount,
  showSelection = false
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBulkAddToCart = () => {
    if (selectedProducts.length === 0) {
      showErrorToast("აირჩიეთ პროდუქტები");
      return;
    }
    onBulkAddToCart(selectedProducts);
    onClearSelection();
    setIsMenuOpen(false);
  };

  const handleCompare = () => {
    if (selectedProducts.length < 2) {
      showErrorToast("აირჩიეთ მინიმუმ 2 პროდუქტი შესადარებლად");
      return;
    }
    if (selectedProducts.length > 4) {
      showErrorToast("შესადარებელია მაქსიმუმ 4 პროდუქტი");
      return;
    }
    onCompare(selectedProducts);
    setIsMenuOpen(false);
  };

  const handleShare = () => {
    if (selectedProducts.length === 0) {
      showErrorToast("აირჩიეთ პროდუქტები გასაზიარებლად");
      return;
    }
    onShare(selectedProducts);
    setIsMenuOpen(false);
  };

  const handleExportFavorites = () => {
    onExportFavorites();
    setIsMenuOpen(false);
  };

  if (selectedProducts.length === 0 && favoritesCount === 0 && !showSelection) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Selection Counter */}
      {selectedProducts.length > 0 && (
        <div className="mb-3 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <span className="text-sm font-medium">
            არჩეულია: {selectedProducts.length}
          </span>
          <button
            onClick={onClearSelection}
            className="ml-2 text-blue-200 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Action Button */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
            selectedProducts.length > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : showSelection
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-600 hover:bg-gray-700"
          } text-white flex items-center justify-center text-xl`}
        >
          {selectedProducts.length > 0 ? "⚡" : showSelection ? "☑️" : "★"}
        </button>

        {/* Menu Options */}
        {isMenuOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 min-w-48">
            {selectedProducts.length > 0 ? (
              <>
                <button
                  onClick={handleBulkAddToCart}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  🛒 დამატება კალათაში
                </button>
                <button
                  onClick={handleCompare}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
                  disabled={selectedProducts.length < 2}
                >
                  ⚖️ შედარება
                </button>
                <button
                  onClick={handleShare}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  📤 გაზიარება
                </button>
                <div className="border-t border-gray-200 my-1"></div>
              </>
            ) : showSelection ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                აირჩიეთ პროდუქტები
              </div>
            ) : null}
            {favoritesCount > 0 && (
              <button
                onClick={handleExportFavorites}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
              >
                📄 ფავორიტების ექსპორტი
              </button>
            )}
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default QuickActionsMenu;
