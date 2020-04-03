import * as React from 'react'
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native'
import Modal from 'react-native-modal'
import {observer} from 'mobx-react'
import {observable} from 'mobx'
import {img} from '../assets/img'
import {qrStore, paymentStore} from '../StoreManager'
import QRCode from 'react-native-qrcode-svg'
import { formatIDR } from '../util/currency'

@observer
export class QR extends React.Component {
  @observable modalWidth = 0
  render () {
    return (
      <Modal
        isVisible={qrStore.isOpen}
        onBackdropPress={() => {}}
        coverScreen={true}
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
                          onPress: () => (qrStore.isOpen = false),
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
                {'00:30'}
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
