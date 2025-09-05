export const API_BASE_URL = 'http://localhost:3000';

export const STORES = [
  { id: '2nabiji', name: '2 ნაბიჯი', color: 'bg-sky-600', endpoint: '/products' },
  { id: 'nikora', name: 'ნიკორა', color: 'bg-emerald-600', endpoint: '/nikora' },
];

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
