// import { observable } from "mobx";

// class QRStore {
//   @observable isOpen = false;
//   @observable code = 'tes ini qr code';
// }

//export Store
// export const qrStore = new QRStore();

import { store, view } from '@risingstack/react-easy-state'

export const qrStore = store({
  isOpen: false,
  code: 'tes ini qr code'
})