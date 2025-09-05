import toast from 'react-hot-toast';

// Custom toast messages in Georgian and English
export const toastMessages = {
  success: {
    productAddedToCart: 'პროდუქტი დაემატა კალათაში!',
    productViewed: 'პროდუქტი გახსნილია!',
    filtersCleared: 'ფილტრები გასუფთავდა',
    dataRefreshed: 'მონაცემები განახლდა',
    copySuccess: 'კოპირება წარმატებულია',
  },
  error: {
    loadingFailed: 'მონაცემების ჩატვირთვა ვერ მოხერხდა',
    networkError: 'ქსელის შეცდომა',
    productNotFound: 'პროდუქტი ვერ მოიძებნა',
    generalError: 'დაფიქსირდა შეცდომა',
  },
  loading: {
    fetchingProducts: 'პროდუქტების ჩატვირთვა...',
    refreshing: 'განახლება...',
  },
  info: {
    noResults: 'შედეგები ვერ მოიძებნა',
    filterApplied: 'ფილტრი გამოყენებულია',
  }
};

// Custom toast functions with predefined styles
export const showSuccessToast = (message) => {
  return toast.success(message, {
    duration: 3000,
    style: {
      background: '#f0fdf4',
      border: '1px solid #10b981',
      color: '#047857',
    },
  });
};

export const showErrorToast = (message) => {
  return toast.error(message, {
    duration: 5000,
    style: {
      background: '#fef2f2',
      border: '1px solid #ef4444',
      color: '#dc2626',
    },
  });
};

export const showLoadingToast = (message) => {
  return toast.loading(message, {
    style: {
      background: '#f8fafc',
      border: '1px solid #94a3b8',
      color: '#475569',
    },
  });
};

export const showInfoToast = (message) => {
  return toast(message, {
    icon: 'ℹ️',
    duration: 4000,
    style: {
      background: '#f0f9ff',
      border: '1px solid #0ea5e9',
      color: '#0369a1',
    },
  });
};

// Custom toast for product actions
export const showProductToast = (action, productName) => {
  switch (action) {
    case 'addToCart':
      return showSuccessToast(`${productName} - ${toastMessages.success.productAddedToCart}`);
    case 'view':
      return showInfoToast(`${productName} - ${toastMessages.success.productViewed}`);
    default:
      return showInfoToast(productName);
  }
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Custom promise toast for async operations
export const showPromiseToast = (promise, messages) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || toastMessages.loading.fetchingProducts,
      success: messages.success || 'წარმატებულია!',
      error: messages.error || toastMessages.error.generalError,
    },
    {
      style: {
        minWidth: '250px',
      },
      success: {
        duration: 3000,
        style: {
          background: '#f0fdf4',
          border: '1px solid #10b981',
          color: '#047857',
        },
      },
      error: {
        duration: 5000,
        style: {
          background: '#fef2f2',
          border: '1px solid #ef4444',
          color: '#dc2626',
        },
      },
    }
  );
};

export default toast;
