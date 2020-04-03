import { HttpRequestService } from '../core/http/HttpService'
import { authStore } from '../StoreManager'
import moment from 'moment'

export class RestService {
  get http () {
    return new HttpRequestService(authStore.baseUrl)
  }
  async pay (amount, searchKey, clientTransactionId) {
    try {
      const date = new Date()
      const transactionDatetimeOffset = moment(date).format(
        'YYYY-MM-DDTHH:mm:ssZ'
      )

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
}
