import { observable, computed } from "mobx";
import { CONSTANT } from "../constant/constant";
import { store, view } from '@risingstack/react-easy-state';

// class AuthStore {
//   @observable apiKey = null;
//   @observable outletId = null; 
//   @observable ENV = 'production'; 
//   @computed get baseUrl() {
//     return CONSTANT.mainUrl[this.ENV]
//   }
// }

// export const authStore = new AuthStore();

export const authStore = store({
  apiKey: null,
  outletId: null,
  ENV: 'production',
});