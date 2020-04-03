import { store } from '@risingstack/react-easy-state'

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
