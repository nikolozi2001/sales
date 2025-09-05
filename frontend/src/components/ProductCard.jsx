import React from 'react';
import { STORES } from '../constants';
import { extractPrice, calculateDiscountPercentage, formatPrice } from '../utils/helpers';

const ProductCard = ({ product, store }) => {
  const storeInfo = STORES.find(s => s.id === store);
  
  // Handle different data structures from APIs
  let title, image, oldPrice, newPrice, discount, link;
  
  if (store === '2nabiji') {
    title = product.title;
    image = product.image;
    oldPrice = extractPrice(product.oldPrice);
    newPrice = extractPrice(product.price);
    discount = product.discount;
  } else if (store === 'nikora') {
    title = product.name;
    image = product.img;
    oldPrice = extractPrice(product.oldPrice);
    newPrice = extractPrice(product.newPrice);
    link = product.link;
  }

  const discountPct = calculateDiscountPercentage(oldPrice, newPrice);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/320x240?text=No+Image';
  };

  const handleProductClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="relative">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-44 object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-44 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        <div className="absolute top-2 left-2 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-semibold">
          <span className={`inline-block h-2 w-2 rounded-full ${storeInfo?.color}`}></span>
          <span className="text-xs text-gray-600">{storeInfo?.name}</span>
        </div>
        
        {discountPct > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            -{discountPct}%
          </div>
        )}
        
        {discount && (
          <div className="absolute bottom-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs">
            {discount}
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem] mb-2">
          {title || 'Product'}
        </h3>
        
        <div className="flex items-baseline gap-3 mb-3">
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
        
        <div className="flex items-center justify-between">
          <button 
            onClick={handleProductClick}
            className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50 transition-colors"
          >
            დეტალურად
          </button>
          <button className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition-colors">
            კალათაში
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
