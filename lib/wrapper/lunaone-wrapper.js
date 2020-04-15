import * as React from 'react'
import Payment from '../payment/payment'
import Confirmation from '../confirmation/confirmation'
import QR from '../qr/qr'
import QRScanner from '../qr/qr-scanner'
import { authStore } from '../store-manager'
import { view } from '@risingstack/react-easy-state'
import { socketService } from '../services/socket.service'

class LunaOneWrapper extends React.Component {
  componentDidMount () {
    authStore.apiKey = this.props.apiKey;
    authStore.outletId = this.props.outletId;
    authStore.ENV = this.props.dev ? 'development' : 'production';
    if (this.props.onSuccess && typeof(this.props.onSuccess) === 'function') {
      authStore.onSuccess = this.props.onSuccess;
    }
    // initialize socket
    // socketService.init();
  }
  render () {
    return (
      <>
        {this.props.children}
        <Confirmation />
        <QR />
        <QRScanner />
      </>
    )
  }
}

export default view(LunaOneWrapper)