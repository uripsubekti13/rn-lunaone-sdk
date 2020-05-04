import moment from 'moment'
import * as _ from 'lodash'
import {Alert} from 'react-native'
import {HttpRequestService} from '../core/http/http.service'
import {authStore} from '../store-manager'
import {CONSTANT} from '../constant/constant'

export class RestService {
  get http () {
    const baseUrl = CONSTANT.mainUrl[authStore.ENV]
    return new HttpRequestService(baseUrl)
  }

  async outletPayment () {
    try {
      const data = {
        apiKey: authStore.apiKey,
        outletId: authStore.outletId,
      }
      const res = await this.http.post('v1/client/outlet-payment', data)
      return res
    } catch (error) {
      Alert.alert(
        'Error',
        _.get(error, 'response.data.message') || _.get(error, 'message'),
      )
    }
  }

  async pay (amount, searchKey, clientTransactionId) {
    try {
      const transactionDatetimeOffset = moment().format('YYYY-MM-DDTHH:mm:ssZ')

      const data = {
        transactionAmount: amount,
        description: 'description',
        paymentSearchKey: searchKey,
        transactionDatetimeOffset,
        clientTransactionId,
        apiKey: authStore.apiKey,
        outletId: authStore.outletId,
      }
      const res = await this.http.post('v1/client/pay', data)
      return res
    } catch (error) {
      Alert.alert(
        'Error',
        _.get(error, 'response.data.message') || _.get(error, 'message'),
      )
    }
  }

  async checkStatus (clientTransactionId) {
    try {
      const data = {
        clientTransactionId,
        apiKey: authStore.apiKey,
        outletId: authStore.outletId,
      }
      const res = await this.http.post('v1/client/check-status', data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
}
