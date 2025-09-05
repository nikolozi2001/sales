export const API_BASE_URL = "http://localhost:3000";

export const STORES = [
  {
    id: "2nabiji",
    name: "2 ნაბიჯი",
    color: "bg-sky-600",
    endpoint: "/products",
  },
  {
    id: "nikora",
    name: "ნიკორა",
    color: "bg-emerald-600",
    endpoint: "/nikora",
  },
  { id: "libre", name: "ლიბრე", color: "bg-purple-600", endpoint: "/libre" },
];

export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// Filter constants
export const SORT_OPTIONS = [
  { value: "default", label: "საწყისი", icon: "🔀" },
  { value: "price-asc", label: "ფასი: იაფიდან ძვირისკენ", icon: "💰" },
  { value: "price-desc", label: "ფასი: ძვირიდან იაფისკენ", icon: "💸" },
  {
    value: "discount-desc",
    label: "ფასდაკლება: მაღლიდან დაბლისკენ",
    icon: "🔥",
  },
  { value: "name-asc", label: "სახელი: ა-დან ჰ-მდე", icon: "🔤" },
];

export const PRICE_RANGES = [
  { min: 0, max: 5, label: "0-5 ლარი" },
  { min: 5, max: 15, label: "5-15 ლარი" },
  { min: 15, max: 30, label: "15-30 ლარი" },
  { min: 30, max: 50, label: "30-50 ლარი" },
  { min: 50, max: 100, label: "50-100 ლარი" },
  { min: 100, max: 1000, label: "100+ ლარი" },
];

export const DISCOUNT_RANGES = [
  { min: 0, max: 100, label: "ყველა" },
  { min: 10, max: 100, label: "10%+" },
  { min: 20, max: 100, label: "20%+" },
  { min: 30, max: 100, label: "30%+" },
  { min: 50, max: 100, label: "50%+" },
];
