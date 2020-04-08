import * as React from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import Modal from 'react-native-modal'
import {paymentStore, qrStore, qrScannerStore} from '../store-manager'
import {img} from '../assets/img'
import {formatIDR} from '../util/transaction'
import {RestService} from '../services/rest.service'
import {view} from '@risingstack/react-easy-state'

class Payment extends React.Component {
  state = {modalWidth: 0}

  render () {
    return (
      <Modal
        isVisible={paymentStore.isOpen}
        onBackdropPress={() => {
          paymentStore.isOpen = false
        }}
        coverScreen={true}
        style={styles.modal}>
        <View style={styles.container}>
          <View
            style={styles.containerChild}
            onLayout={e => {
              this.setState({modalWidth: e.nativeEvent.layout.width})
            }}>
            <Image source={img.logo} style={styles.logo} />
            <Text style={styles.totalPaymentLabel}>{`Total Payment`}</Text>
            <Text style={styles.totalPaymentValue}>
              {formatIDR(paymentStore.amount)}
            </Text>
            <View style={styles.paymentMethodContainer}>
              {paymentStore.payments.map((a, i) => {
                return (
                  <CardView
                    key={i}
                    width={this.state.modalWidth / 4}
                    data={a}
                  />
                )
              })}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const Card = props => {
  const restService = new RestService()
  return (
    <TouchableOpacity
      onPress={async () => {
        // if
        if (props.data.searchKey === 'alipay') {
          qrScannerStore.isOpen = true
        } else {
          const res = await restService.pay(
            paymentStore.amount,
            props.data.searchKey,
            paymentStore.transactionId,
          )

          if (res && res.body) {
            qrStore.code = res.body.bankQrCode
            qrStore.isOpen = true
          }
        }

        paymentStore.isOpen = false
      }}
      style={{width: props.width, height: props.width, padding: 5}}>
      <View style={styles.card}>
        <Image source={getPMLogo(props.data.name)} style={styles.pmLogo} />
      </View>
    </TouchableOpacity>
  )
}

const CardView = view(Card)

const getPMLogo = name => {
  if (name === 'maybank') {
    return img.pm.maybank
  } else if (name === 'dana') {
    return img.pm.dana
  } else if (name === 'shopeepay') {
    return img.pm.shopeepay
  } else if (name === 'alipay') {
    return img.pm.alipay
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFF',
    width: '90%',
    maxWidth: 300,
    padding: 10,
    borderRadius: 5,
  },
  containerChild: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {width: 150, resizeMode: 'contain', height: 50},
  totalPaymentLabel: {
    textAlign: 'center',
    fontSize: 15,
    color: 'grey',
  },
  totalPaymentValue: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  card: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
  },
  pmLogo: {width: '100%', height: '100%', resizeMode: 'contain'},
})

export default view(Payment)
