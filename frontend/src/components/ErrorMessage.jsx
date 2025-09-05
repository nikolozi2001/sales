import React from 'react';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="p-8 text-center">
      <div className="mb-4">
        <svg className="w-16 h-16 mx-auto text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">შეცდომა მონაცემების ჩატვირთვისას</h3>
      <p className="text-gray-500 mb-4">{error}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
        >
          თავიდან ცდა
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
