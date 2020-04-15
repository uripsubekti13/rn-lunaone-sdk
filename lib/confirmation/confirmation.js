import * as React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { paymentStore, qrStore, qrScannerStore } from '../store-manager'
import { img } from '../assets/img'
import { formatIDR } from '../util/transaction'
import { RestService } from '../services/rest.service'
import { view } from '@risingstack/react-easy-state'

class Confirmation extends React.Component {
  restService = new RestService()
  state = { modalWidth: 0 }


  onNext = async () => {
    // if
    if (paymentStore.searchKey === 'alipay') {
      qrScannerStore.isOpen = true
    } else {
      const res = await this.restService.pay(
        paymentStore.amount,
        paymentStore.searchKey,
        paymentStore.transactionId,
      )

      if (res && res.body) {
        qrStore.code = res.body.bankQrCode
        qrStore.isOpen = true
      }
    }

    paymentStore.isOpen = false
  }
  render () {
    return (
      <Modal
        isVisible={paymentStore.isOpen}
        onBackdropPress={() => {
          paymentStore.isOpen = false
        }}
        coverScreen={true}
        style={styles.modal}
      >
        <View style={styles.container}>
          <View
            style={styles.containerChild}
            onLayout={e => {
              this.setState({ modalWidth: e.nativeEvent.layout.width })
            }}
          >
            {/* <Image source={img.logo} style={styles.logo} /> */}
            <View style={styles.card}>
              <Image
                source={getPMLogo(paymentStore.searchKey)}
                style={styles.pmLogo}
              />
            </View>
            <Text style={styles.totalPaymentLabel}>{`Total Pembayaran`}</Text>
            <Text style={styles.totalPaymentValue}>
              {formatIDR(paymentStore.amount)}
            </Text>
            <View style={styles.paymentMethodContainer}>
              <Text style={styles.warningText}>
                Perhatian, Metode Pembayaran Ini Tidak Dapat Digabungkan Dengan Metode
                Pembayaran Lain
              </Text>
              <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => paymentStore.isOpen = false} style={[styles.button, {backgroundColor: '#dedede'}]}>
                <Text style={styles.buttonLabel}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onNext} style={styles.button}>
                <Text style={styles.buttonLabel}>Lanjutkan</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const getPMLogo = searchKey => {
  if (searchKey === 'qrisbymaybank') {
    return img.pm.maybank
  } else if (searchKey === 'qrisbydana') {
    return img.pm.dana
  } else if (searchKey === 'qrisbyshopeepay') {
    return img.pm.shopeepay
  } else if (searchKey === 'alipay') {
    return img.pm.alipay
  } else {
    return null
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
  logo: { width: 150, resizeMode: 'contain', height: 50 },
  totalPaymentLabel: {
    textAlign: 'center',
    fontSize: 15,
    color: 'grey'
  },
  totalPaymentValue: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  paymentMethodContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10
  },
  card: {
    width: 100,
    height: 50,
    padding: 5,
  },
  pmLogo: { width: '100%', height: '100%', resizeMode: 'contain' },
  button: {
    marginVertical: 10,
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4e3daa',
    borderRadius: 5, marginHorizontal: 5
  },
  buttonLabel: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
  qr: { marginVertical: 15 },
  warningText: {textAlign: 'center', color: '#555', fontSize: 13, marginTop: 10, marginBottom: 15},
  
})

export default view(Confirmation)
