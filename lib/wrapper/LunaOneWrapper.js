import * as React from 'react'
import {observer} from 'mobx-react'
import {Payment} from '../payment/Payment'
import { QR } from '../qr/QR'
import { authStore } from '../StoreManager';

@observer
export class LunaOneWrapper extends React.Component {
  componentDidMount() {
    authStore.apiKey = this.props.apiKey;
    authStore.outletId = this.props.outletId;
    authStore.ENV = this.props.dev ? 'development' : 'production'
  }
  render () {
    return (
      <>
        {this.props.children}
        <Payment />
        <QR/>
      </>
    )
  }
}