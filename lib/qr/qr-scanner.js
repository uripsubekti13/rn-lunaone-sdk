import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native'
import Modal from 'react-native-modal'
import { img } from '../assets/img'
import { qrStore, paymentStore } from '../store-manager'
import QRCode from 'react-native-qrcode-svg'
import { formatIDR, toMMSS } from '../util/transaction'
import { RestService } from '../services/rest.service'
import BackgroundTimer from 'react-native-background-timer'
import { view } from '@risingstack/react-easy-state'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { qrScannerStore } from './qr-scanner.store'
const SCREEN_WIDTH = Dimensions.get('window').width

const INIT_STATE = {}

class QRScanner extends React.Component {
  restService = new RestService()

  state = INIT_STATE

  onSuccess = e => {
    console.log(e)
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
                        onPress: () => {
                          qrScannerStore.isOpen = false
                        }
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

          <QRCodeScanner
            onRead={this.onSuccess}
            topViewStyle={{ flex: 0, height: 40 }}
            bottomViewStyle={{ flex: 0, height: 20 }}
            cameraStyle={{
              width: SCREEN_WIDTH * 0.7,
              alignSelf: 'center'
            }}
            topContent={}
            bottomContent={
              <View
                style={{
                  width: SCREEN_WIDTH * 0.86,
                  flex: 1,
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-start'
                  }}
                >
                  {/* <Image
                    source={images.frame.bottomLeft}
                    resizeMode={'contain'}
                    style={styles.frame}
                  /> */}
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end'
                  }}
                >
                  {/* <Image
                    source={images.frame.bottomRight}
                    resizeMode={'contain'}
                    style={styles.frame}
                  /> */}
                </View>
              </View>
            }
          />
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
  header: { flexDirection: 'row' },
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
  }
})

export default view(QRScanner)
