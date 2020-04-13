import * as React from 'react'
import Payment from '../payment/payment'
import QR from '../qr/qr'
import QRScanner from '../qr/qr-scanner'
import { authStore, callbackStore } from '../store-manager'
import { view } from '@risingstack/react-easy-state'
import { socketService } from '../services/socket.service'

class LunaOneWrapper extends React.Component {
  componentDidMount () {
    authStore.apiKey = this.props.apiKey;
    authStore.outletId = this.props.outletId;
    authStore.ENV = this.props.dev ? 'development' : 'production';
    if (this.props.onSuccess && typeof(this.props.onSuccess) === 'function') {
      callbackStore.onSuccess = this.props.onSuccess;
    }
    if (this.props.onFailed && typeof(this.props.onFailed) === 'function') {
      callbackStore.onFailed = this.props.onFailed;
    }
    // initialize socket
    // socketService.init();
  }
  render () {
    return (
      <>
        {this.props.children}
        <Payment />
        <QR />
        <QRScanner />
      </>
    )
  }
}

export default view(LunaOneWrapper)