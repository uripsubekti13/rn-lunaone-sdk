import { authStore } from '../StoreManager'
import moment from 'moment'
import alphanumeric from 'alphanumeric'

export const generateTransactionId = () => {
  clientTransactionId =
    authStore.outletId +
    '_' +
    moment().format('DDMMYYYY') +
    '_' +
    alphanumeric(10)
  return clientTransactionId
}
