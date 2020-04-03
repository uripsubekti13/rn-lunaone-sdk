import { paymentStore, authStore } from './StoreManager'
import { Alert } from 'react-native'

class LunaOneAction {
  pay (amount, transactionId = null) {
    if (this.verify()) {
      paymentStore.amount = amount;
      paymentStore.transactionId = transactionId;
      paymentStore.isOpen = true;
    } else {
      Alert.alert('Error', 'apiKey or outletId is null')
    }
  }

  cancel () {
    paymentStore.amount = 0
    paymentStore.isOpen = false
  }

  verify () {
    if (authStore.apiKey && authStore.outletId) return true
    return false
  }
}

export const LunaOne = new LunaOneAction()
