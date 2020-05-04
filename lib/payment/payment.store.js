import { store } from '@risingstack/react-easy-state'

export const paymentStore = store({
  isOpen: false,
  amount: 0,
  transactionId: null,
  searchKey: null,
  payments: [
    // {
    //   name: 'maybank',
    //   searchKey: 'qrisbymaybank'
    // },
    // {
    //   name: 'dana',
    //   searchKey: 'qrisbydana'
    // },
    // {
    //   name: 'shopeepay',
    //   searchKey: 'qrisbyshopeepay'
    // },
    // {
    //   name: 'alipay',
    //   searchKey: 'alipay'
    // }
  ]
})
