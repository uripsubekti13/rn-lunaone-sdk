import { observable, computed } from "mobx";
import { CONSTANT } from "../constant/constant";

class AuthStore {
  @observable apiKey = null;
  @observable outletId = null; 
  @observable ENV = 'production'; 
  @computed get baseUrl() {
    return CONSTANT.mainUrl[this.ENV]
  }
}

export const authStore = new AuthStore();