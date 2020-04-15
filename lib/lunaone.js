import { paymentStore, authStore } from './store-manager'
import { Alert } from 'react-native'
import { generateTransactionId } from './util/transaction';

class LunaOneAction {
  pay (amount, searchKey, transactionId = null) {
    if (this.verify()) {
      paymentStore.amount = amount;
      paymentStore.searchKey = searchKey;
      paymentStore.transactionId = transactionId || generateTransactionId();
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
