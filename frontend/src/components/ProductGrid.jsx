import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  
  if (error) return <ErrorMessage error={error} />;
  
  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 12c0-4.411-3.589-8-8-8s-8 3.589-8 8c.001 2.173.889 4.133 2.343 5.543l.002.002L8 21l2.172-2.828z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">ფასდაკლებები არ მოიძებნა</h3>
        <p className="text-gray-500">სცადეთ სხვა საძიებო ტერმინი ან შეცვალეთ ფილტრები</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
