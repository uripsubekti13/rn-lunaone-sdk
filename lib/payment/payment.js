import * as React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import { paymentStore, qrStore } from '../store-manager'
import { img } from '../assets/img'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { formatIDR } from '../util/transaction'
import { RestService } from '../services/rest.service'


@observer
export class Payment extends React.Component {
  @observable modalWidth = 0

  render () {
    return (
      <Modal
        isVisible={paymentStore.isOpen}
        onBackdropPress={() => {
          paymentStore.isOpen = false
        }}
        coverScreen={true}
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            backgroundColor: '#FFF',
            width: '90%',
            maxWidth: 300,
            padding: 10,
            borderRadius: 5
          }}
        >
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onLayout={e => (this.modalWidth = e.nativeEvent.layout.width)}
          >
            <Image
              source={img.logo}
              style={{ width: 150, resizeMode: 'contain', height: 50 }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: 'grey'
              }}
            >{`Total Payment`}</Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold'
              }}
            >
              {formatIDR(paymentStore.amount)}
            </Text>
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}
            >
              {paymentStore.payments.map((a, i) => {
                return <Card key={i} width={this.modalWidth / 4} data={a} />
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
        const res = await restService.pay(
          paymentStore.amount,
          'qrisbydana',
          paymentStore.transactionId
        )
        // if (res) {
          paymentStore.isOpen = false
          qrStore.isOpen = true
        // }
      }}
      style={{ width: props.width, height: props.width, padding: 5 }}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
          // shadow
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          padding: 5
        }}
      >
        <Image
          source={getPMLogo(props.data.name)}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      </View>
    </TouchableOpacity>
  )
}

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
