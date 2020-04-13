import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native'
import Modal from 'react-native-modal'
import {img} from '../assets/img'
import {qrStore, paymentStore} from '../store-manager'
import QRCode from 'react-native-qrcode-svg'
import {formatIDR, toMMSS} from '../util/transaction'
import {RestService} from '../services/rest.service'
import BackgroundTimer from 'react-native-background-timer'
import {view} from '@risingstack/react-easy-state'
import QRCodeScanner from 'react-native-qrcode-scanner'
import {qrScannerStore} from './qr-scanner.store'

let INIT_STATE = {
  screen_width: Dimensions.get('screen').width,
  screen_height: Dimensions.get('screen').height,
}

class QRScanner extends React.Component {
  restService = new RestService()

  state = INIT_STATE

  onReadQR = (event) => {
    const qrData = event.data
    // do something here
    console.log(qrData)
  }

  get camera_width () {
    if (this.state.screen_width < this.state.screen_height) {
      return 0.7 * this.state.screen_width
    } else {
      return 0.7 * this.state.screen_height
    }
  }

  get isLandscape() {
    return this.state.screen_height < this.state.screen_width ? true : false;
  }

  render () {
    return (
      <Modal
        isVisible={qrScannerStore.isOpen}
        onBackdropPress={() => {}}
        coverScreen={true}
        onShow={() => {
          this.setState(INIT_STATE)
        }}
        style={[styles.modal, {width: '100%', height: '100%'}]}>
        <View style={styles.container}>
          {/* <ScrollView> */}
            <View style={styles.header}>
              <View style={{width: 30}}></View>
              <View style={styles.logoContainer}>
                <Image source={img.logo} style={styles.logo} />
              </View>
              <View style={styles.closeContainer}>
                <TouchableOpacity
                  onPress={() => {
                    qrScannerStore.isOpen = false
                  }}>
                  <Image source={img.close} style={styles.close} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: this.isLandscape ? 0 : (this.state.screen_height - this.camera_width - 200)/2}}>
              <QRCodeScanner
                onRead={this.onReadQR}
                cameraStyle={{
                  width: this.camera_width,
                  height: this.camera_width,
                  alignSelf: 'center',
                }}
              />
            </View>
          {/* </ScrollView> */}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    padding: 10,
    // flex: 1
  },
  header: {flexDirection: 'row'},
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {width: 150, resizeMode: 'contain', height: 50},
  closeContainer: {
    width: 30,
    alignItems: 'center',
  },
  close: {
    width: 25,
    resizeMode: 'contain',
    height: 25,
    opacity: 0.3,
  },
})

export default view(QRScanner)
