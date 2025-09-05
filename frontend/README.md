# Sales Frontend - Upgraded Structure

A modern React application for displaying discounted products from Georgian grocery stores (ნიკორა and 2 ნაბიჯი).

## 🏗️ Project Structure

```
frontend/src/
├── components/           # Reusable UI components
│   ├── Header.jsx       # App header with navigation
│   ├── Footer.jsx       # App footer
│   ├── SearchBar.jsx    # Search input component
│   ├── StoreSwitcher.jsx # Store filter buttons
│   ├── ProductCard.jsx  # Individual product display
│   ├── ProductGrid.jsx  # Grid layout for products
│   ├── LoadingSpinner.jsx # Loading state component
│   ├── ErrorMessage.jsx # Error display component
│   ├── StatsBar.jsx     # Statistics and actions bar
│   └── index.js         # Component exports
├── hooks/               # Custom React hooks
│   ├── useProducts.js   # Product data management
│   ├── useProductFilters.js # Filtering logic
│   └── index.js         # Hook exports
├── services/            # API services
│   └── api.js          # API communication layer
├── utils/               # Utility functions
│   └── helpers.js      # Helper functions
├── constants/           # App constants
│   └── index.js        # Constants definition
├── App.jsx             # Main application component
├── App.css             # Global styles
└── main.jsx            # App entry point
```

## 🚀 Features

### Components
- **Modular Design**: Each component has a single responsibility
- **Reusable**: Components can be easily reused across the app
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessible**: Proper ARIA labels and keyboard navigation

### Hooks
- **useProducts**: Manages product data fetching and state
- **useProductFilters**: Handles search and store filtering logic

### Services
- **API Service**: Centralized API communication with error handling
- **Health Checks**: API availability monitoring

### Utils
- **Price Parsing**: Extract prices from different string formats
- **Discount Calculation**: Calculate discount percentages
- **Filtering**: Advanced product filtering capabilities

## 🔧 Technical Improvements

1. **Separation of Concerns**: Logic separated from UI components
2. **Custom Hooks**: Reusable state management
3. **Error Handling**: Comprehensive error states and recovery
4. **Performance**: Optimized re-renders with useMemo and useCallback
5. **Type Safety**: Better prop handling and validation
6. **Maintainability**: Easier to test and modify individual components

## 🎨 UI/UX Enhancements

- **Loading States**: Smooth loading animations
- **Error States**: User-friendly error messages with retry options
- **Empty States**: Informative messages when no products found
- **Hover Effects**: Interactive product cards
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Screen reader friendly

## 📡 API Integration

The app fetches data from two endpoints:
- `/products` - 2 ნაბიჯი store products
- `/nikora` - ნიკორა store products

Data is normalized to handle different response formats from each store.

## 🔄 State Management

- **Products State**: Centralized product data management
- **Filter State**: Search and store filter management
- **Loading State**: Request status tracking
- **Error State**: Error handling and display

## 🚀 Getting Started

1. Start the backend server:
   ```bash
   cd backend && npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend && npm run dev
   ```

3. Open http://localhost:5173 in your browser

## 🔮 Future Enhancements

- [ ] Add product categories
- [ ] Implement sorting options
- [ ] Add favorite products
- [ ] Shopping cart functionality
- [ ] Price history tracking
- [ ] Push notifications for deals
- [ ] Progressive Web App (PWA) features
- [ ] User accounts and preferences

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
