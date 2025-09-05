import React from 'react';
import { STORES } from '../constants';

const StoreSwitcher = ({ selected, setSelected }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setSelected(null)}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          selected === null 
            ? 'ring-2 ring-offset-2 ring-emerald-300 bg-white shadow-sm' 
            : 'bg-white/60 hover:bg-white/80'
        }`}
      >
        ყველა
      </button>
      {STORES.map((store) => (
        <button
          key={store.id}
          onClick={() => setSelected(store.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
            selected === store.id 
              ? 'ring-2 ring-offset-2 ring-emerald-300 bg-white shadow-sm' 
              : 'bg-white/60 hover:bg-white/80'
          }`}
        >
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${store.color}`}></span>
          <span>{store.name}</span>
        </button>
      ))}
    </div>
  );
};

export default StoreSwitcher;
