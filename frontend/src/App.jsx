import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// Store configurations
const STORES = [
  { id: '2nabiji', name: '2 ნაბიჯი', color: 'bg-sky-600', endpoint: '/products' },
  { id: 'nikora', name: 'ნიკორა', color: 'bg-emerald-600', endpoint: '/nikora' },
];

const API_BASE_URL = 'http://localhost:3000';

// Utility helpers
const extractPrice = (priceStr) => {
  if (!priceStr) return 0;
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const pctOff = (oldP, newP) => {
  if (!oldP || !newP || oldP <= newP) return 0;
  return Math.round(((oldP - newP) / oldP) * 100);
};

// Components
function Header({ onSearch, selectedStore, setSelectedStore }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                G
              </div>
              <div>
                <h1 className="text-lg font-semibold">ფასდაკლებები საქართველოს მაღაზიებში</h1>
                <p className="text-xs text-gray-500">მაღაზიები: ნიკორა, 2 ნაბიჯი</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-xl px-4">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <input
                onChange={(e) => onSearch(e.target.value)}
                className="placeholder:italic placeholder:text-gray-400 block bg-gray-50 w-full border border-gray-200 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                placeholder="ძებნა პროდუქტებში..."
                type="text"
                name="search"
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <StoreSwitcher selected={selectedStore} setSelected={setSelectedStore} />
          </div>
        </div>
      </div>
    </header>
  );
}

function StoreSwitcher({ selected, setSelected }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setSelected(null)}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          selected === null ? 'ring-2 ring-offset-2 ring-emerald-300 bg-white' : 'bg-white/60'
        }`}
      >
        ყველა
      </button>
      {STORES.map((s) => (
        <button
          key={s.id}
          onClick={() => setSelected(s.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
            selected === s.id ? 'ring-2 ring-offset-2 ring-emerald-300 bg-white' : 'bg-white/60'
          }`}
        >
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${s.color}`}></span>
          <span>{s.name}</span>
        </button>
      ))}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  );
}

function ProductCard({ product, store }) {
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

  const discountPct = pctOff(oldPrice, newPrice);

  return (
    <article className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-44 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/320x240?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-44 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        <div className="absolute top-2 left-2 inline-flex items-center gap-2 bg-white/90 px-2 py-1 rounded-md text-sm font-semibold">
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
        <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{title || 'Product'}</h3>
        
        <div className="mt-2 flex items-baseline gap-3">
          {newPrice > 0 && (
            <div className="text-lg font-bold text-emerald-600">{newPrice.toFixed(2)}₾</div>
          )}
          {oldPrice > 0 && oldPrice !== newPrice && (
            <div className="text-sm text-gray-400 line-through">{oldPrice.toFixed(2)}₾</div>
          )}
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          {link ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50"
            >
              დეტალურად
            </a>
          ) : (
            <button className="px-3 py-1 rounded-md border text-sm">დეტალურად</button>
          )}
          <button className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">
            კალათაში
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductGrid({ products, loading, error }) {
  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-2">შეცდომა მონაცემების ჩატვირთვისას</div>
        <div className="text-gray-500 text-sm">{error}</div>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        ფასდაკლებები არ მოიძებნა.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((item, index) => (
        <ProductCard key={`${item.store}-${index}`} product={item.product} store={item.store} />
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-10 py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} ფასდაკლებები — React + Tailwind. ყველა უფლება დაცულია.
    </footer>
  );
}

// Main App Component
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const promises = STORES.map(async (store) => {
          try {
            const response = await fetch(`${API_BASE_URL}${store.endpoint}`);
            if (!response.ok) throw new Error(`Failed to fetch from ${store.name}`);
            
            const data = await response.json();
            return data.map(product => ({ store: store.id, product }));
          } catch (err) {
            console.error(`Error fetching from ${store.name}:`, err);
            return [];
          }
        });

        const results = await Promise.all(promises);
        const allProducts = results.flat();
        setProducts(allProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search and store selection
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by selected store
    if (selectedStore) {
      filtered = filtered.filter(item => item.store === selectedStore);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => {
        const product = item.product;
        const title = (product.title || product.name || '').toLowerCase();
        return title.includes(query);
      });
    }

    return filtered;
  }, [products, selectedStore, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header 
        onSearch={setSearchQuery} 
        selectedStore={selectedStore} 
        setSelectedStore={setSelectedStore} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">ფასდაკლებები</h2>
              <p className="text-sm text-gray-500 mt-1">
                {loading ? 'ჩატვირთვა...' : `${filteredProducts.length} პროდუქტი მოიძებნა`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="px-3 py-1.5 rounded-md border bg-white text-sm text-gray-700 hover:bg-gray-50"
              >
                განახლება
              </button>
            </div>
          </div>
        </div>

        <ProductGrid 
          products={filteredProducts} 
          loading={loading} 
          error={error} 
        />

        <Footer />
      </main>
    </div>
  );
}
