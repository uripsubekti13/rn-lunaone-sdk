import { observable } from 'mobx'
import { store, view } from '@risingstack/react-easy-state'

// class PaymentStore {
//   @observable isOpen = false;
//   @observable amount = 0;
//   @observable transactionId = null;
//   @observable payments = [
//     {
//       name: 'maybank'
//     },
//     {
//       name: 'dana'
//     },
//     {
//       name: 'shopeepay'
//     },
//     {
//       name: 'alipay'
//     }
//   ]
// }

// //export Store
// export const paymentStore = new PaymentStore();
export const paymentStore = store({
  isOpen: false,
  amount: 0,
  transactionId: null,
  payments: [
    {
      name: 'maybank'
    },
    {
      name: 'dana'
    },
    {
      name: 'shopeepay'
    },
    {
      name: 'alipay'
    }
  ]
})
