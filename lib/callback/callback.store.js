import { store } from '@risingstack/react-easy-state';

export const callbackStore = store({
  onSuccess: (data) => {},
  onFailed: (data) => {}
});