const currencyFormatter = require('currency-formatter')

const formatIDR = amount => {
  return currencyFormatter.format(amount, { code: 'IDR' })
}

export {
  formatIDR
}