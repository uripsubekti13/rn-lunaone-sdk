import { observable } from "mobx";

class QRStore {
  @observable isOpen = false;
  @observable code = 'tes ini qr code';
}

//export Store
export const qrStore = new QRStore();