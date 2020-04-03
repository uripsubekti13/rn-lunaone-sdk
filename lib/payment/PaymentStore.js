import { observable } from "mobx";

//create a store with count observable
class PaymentStore {
  @observable isOpen = false;
  @observable amount = 0;
  @observable payments = [
    {
      name: 'maybank'
    },
    {
      name: 'dana'
    },
    {
      name: 'shopeepay'
    },
    {
      name: 'alipay'
    }
  ]
}

//export Store
export const paymentStore = new PaymentStore();