import React from 'react';

const LoadingSpinner = ({ message = "ჩატვირთვა..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
