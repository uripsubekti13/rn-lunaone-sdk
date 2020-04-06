import moment from 'moment'
import * as _ from 'lodash'
import { Alert } from 'react-native'
import { HttpRequestService } from '../core/http/http.service'
import { authStore } from '../store-manager'
import { CONSTANT } from '../constant/constant'

export class RestService {
  get http () {
    const baseUrl = CONSTANT.mainUrl[authStore.ENV]
    return new HttpRequestService(baseUrl)
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
      return res
    } catch (error) {
      Alert.alert('Error', _.get(error, 'response.data.message'))
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
