import React from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto mt-10 bg-red-50 border border-red-200 rounded-lg text-center">
        <ErrorMessage error={error} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-12 text-center">
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
          className="px-4 py-2 text-sm rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          განახლება
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((item, index) => (
        <ProductCard
          key={`${item.store}-${index}`}
          product={item.product}
          store={item.store}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
