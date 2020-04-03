import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet
} from 'react-native'
import Modal from 'react-native-modal'
import { img } from '../assets/img'
import { qrStore, paymentStore } from '../store-manager'
import QRCode from 'react-native-qrcode-svg'
import { formatIDR, toMMSS } from '../util/transaction'
import { RestService } from '../services/rest.service'
import BackgroundTimer from 'react-native-background-timer'
import { view } from '@risingstack/react-easy-state'

const INIT_STATE = {
  timeout: 90,
  modalWidth: 0,
  triggered: false
}

class QR extends React.Component {
  restService = new RestService()

  state = INIT_STATE

  onCheckStatus = async () => {
    const res = await this.restService.checkStatus(paymentStore.transactionId)
  }

  startTimer () {
    BackgroundTimer.runBackgroundTimer(() => {
      if (this.state.timeout > 0) {
        this.setState({
          timeout: this.state.timeout - 1
        })
      } else {
        this.stopTimer()
        !this.state.triggered && this.onCheckStatus()
        this.setState({ triggered: true })
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
          this.setState(INIT_STATE)
          this.startTimer()
        }}
        style={styles.modal}
      >
        <View style={styles.container}>
          <View
            style={styles.containerChild}
            onLayout={e => {
              this.setState({ modalWidth: e.nativeEvent.layout.width })
            }}
          >
            <View style={styles.header}>
              <View style={{ width: 30 }}></View>
              <View style={styles.logoContainer}>
                <Image source={img.logo} style={styles.logo} />
              </View>
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Warning',
                      'Apakah anda yakin akan membatalkan transaksi?',
                      [
                        {
                          text: 'Ya',
                          onPress: this.onClose
                        },
                        {
                          text: 'Tidak',
                          onPress: () => {}
                        }
                      ]
                    )
                  }}
                >
                  <Image source={img.close} style={styles.close} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.timeoutLabel}>{`Kode Berlaku`}</Text>
              <Text style={styles.timeoutValue}>
                {toMMSS(this.state.timeout)}
              </Text>
            </View>
            <View style={styles.qr}>
              <QRCode value={qrStore.code} size={250} />
            </View>
            <Text style={styles.amount}>{formatIDR(paymentStore.amount)}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonLabel}>Perbaharui Status</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#FFF',
    width: '90%',
    maxWidth: 300,
    padding: 10,
    borderRadius: 5
  },
  containerChild: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center'
  },
  logo: { width: 150, resizeMode: 'contain', height: 50 },
  closeContainer: {
    width: 30,
    alignItems: 'center'
  },
  close: {
    width: 25,
    resizeMode: 'contain',
    height: 25,
    opacity: 0.3
  },
  timeoutLabel: {
    textAlign: 'center',
    fontSize: 15,
    color: 'grey'
  },
  timeoutValue: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  amount: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
  button: {
    marginVertical: 10,
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4e3daa',
    borderRadius: 5
  },
  buttonLabel: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
  qr: { marginVertical: 15 },
  header: { flexDirection: 'row' }
})

export default view(QR)