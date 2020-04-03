import { authStore } from '../store-manager'
import moment from 'moment'
import alphanumeric from 'alphanumeric'
const currencyFormatter = require('currency-formatter')

export const formatIDR = amount => {
  return currencyFormatter.format(amount, { code: 'IDR' })
}

export const generateTransactionId = () => {
  clientTransactionId =
    authStore.outletId +
    '_' +
    moment().format('DDMMYYYY') +
    '_' +
    alphanumeric(10)
  return clientTransactionId
}

export const toMMSS = (sec_num) => {
  {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;
    let MM = '';
    let SS = '';
    if (minutes < 10) {
      MM = '0' + minutes.toString();
    } else {
      MM = minutes.toString();
    }
    if (seconds < 10) {
      SS = '0' + seconds.toString();
    } else {
      SS = seconds.toString();
    }
    return MM + ':' + SS;
  }
};
