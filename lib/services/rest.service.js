import { HttpRequestService } from '../core/http/http.service'
import { authStore } from '../store-manager'
import moment from 'moment'
import alphanumeric from 'alphanumeric'
import { generateTransactionId } from '../util/transaction'

export class RestService {
  get http () {
    return new HttpRequestService(authStore.baseUrl)
  }
  async pay (amount, searchKey, clientTransactionId) {
    try {
      const transactionDatetimeOffset = moment().format('YYYY-MM-DDTHH:mm:ssZ')

      const data = {
        body: {
          transactionAmount: amount,
          description: 'description',
          paymentSearchKey: searchKey,
          transactionDatetimeOffset,
          clientTransactionId,
          apiKey: authStore.apiKey,
          outletId: authStore.outletId
        },
        signature: 'signature'
      }
      const res = await this.http.post('v1/client/pay', data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  async checkStatus (clientTransactionId) {
    try {
      
      const data = {
        body: {
          clientTransactionId,
          apiKey: authStore.apiKey,
          outletId: authStore.outletId
        },
        signature: 'signature'
      }
      const res = await this.http.post('v1/client/check-status', data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
}
