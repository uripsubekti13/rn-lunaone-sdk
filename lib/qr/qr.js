import * as React from 'react'
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native'
import Modal from 'react-native-modal'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import {img} from '../assets/img'
import {qrStore, paymentStore} from '../store-manager'
import QRCode from 'react-native-qrcode-svg'
import {formatIDR, toMMSS} from '../util/transaction'
import {RestService} from '../services/rest.service'
import BackgroundTimer from 'react-native-background-timer'

const INIT_STATE = {
  timeout: 90,
}

@observer
export class QR extends React.Component {
  restService = new RestService()
  @observable modalWidth = 0
  @observable triggered = false

  state = INIT_STATE

  onCheckStatus = async () => {
    const res = await this.restService.checkStatus(paymentStore.transactionId)
  }

  startTimer () {
    BackgroundTimer.runBackgroundTimer(() => {
      if (this.state.timeout > 0) {
        this.setState({
          timeout: this.state.timeout - 1,
        })
      } else {
        this.stopTimer()
        !this.triggered && this.onCheckStatus()
        this.triggered = true
      }
    }, 1000)
  }

  stopTimer () {
    BackgroundTimer.stopBackgroundTimer()
  }

  onClose = () => {
    this.stopTimer()
    qrStore.isOpen = false
  }

  render () {
    return (
      <Modal
        isVisible={qrStore.isOpen}
        onBackdropPress={() => {}}
        coverScreen={true}
        onShow={() => {
          this.triggered = false
          this.setState(INIT_STATE)
          this.startTimer()
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#FFF',
            width: '90%',
            maxWidth: 300,
            padding: 10,
            borderRadius: 5,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onLayout={e => (this.modalWidth = e.nativeEvent.layout.width)}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 30}}></View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Image
                  source={img.logo}
                  style={{width: 150, resizeMode: 'contain', height: 50}}
                />
              </View>
              <View
                style={{
                  width: 30,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Warning',
                      'Apakah anda yakin akan membatalkan transaksi?',
                      [
                        {
                          text: 'Ya',
                          onPress: this.onClose,
                        },
                        {
                          text: 'Tidak',
                          onPress: () => {},
                        },
                      ],
                    )
                  }}>
                  <Image
                    source={img.close}
                    style={{
                      width: 25,
                      resizeMode: 'contain',
                      height: 25,
                      opacity: 0.3,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  color: 'grey',
                }}>{`Kode Berlaku`}</Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {toMMSS(this.state.timeout)}
              </Text>
            </View>
            <View style={{marginVertical: 15}}>
              <QRCode value={qrStore.code} size={250} />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              {formatIDR(paymentStore.amount)}
            </Text>
            <TouchableOpacity
              style={{
                marginVertical: 10,
                width: 200,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4e3daa',
                borderRadius: 5,
              }}>
              <Text style={{color: '#FFF', fontSize: 17, fontWeight: 'bold'}}>
                Perbaharui Status
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}