import * as React from 'react'
import Payment from '../payment/payment'
import QR from '../qr/qr'
import { authStore } from '../store-manager'
import { view } from '@risingstack/react-easy-state'

class LunaOneWrapper extends React.Component {
  componentDidMount () {
    authStore.apiKey = this.props.apiKey
    authStore.outletId = this.props.outletId
    authStore.ENV = this.props.dev ? 'development' : 'production'
  }
  render () {
    return (
      <>
        {this.props.children}
        <Payment />
        <QR />
      </>
    )
  }
}

export default view(LunaOneWrapper)