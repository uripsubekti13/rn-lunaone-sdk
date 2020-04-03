# rn-lunaone-sdk

Lunaone SDK for React Native Framework.

## Installation

```
npm install github:uripsubekti13/rn-lunaone-sdk react-native-background-timer --save

npx react-native link react-native-background-timer
```

## Examples

```
import { LunaOneWrapper, LunaOne } from 'rn-lunaone-sdk'

onPay() {
  const amount = 10000;
  LunaOne.pay(amount) // LunaOne.pay(amount: number, transactionId?: string)
}

render() {
  return (
   <LunaOneWrapper
     apiKey={`YOUR API KEY HERE`}
     outletId={YOUR OUTLET ID HERE}
     dev={true} // environment, if true the environment is `development` else if false it's `production`
     >
    .....
      <TouchableOpacity onPress={this.onPay} >
        <Text>Pay</Text>
      </TouchableOpacity>
   </LunaOneWrapper>
  );
};

```
