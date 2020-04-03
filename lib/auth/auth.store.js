import { store } from '@risingstack/react-easy-state';

export const authStore = store({
  apiKey: null,
  outletId: null,
  ENV: 'production',
});