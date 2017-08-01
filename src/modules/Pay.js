
import { NativeModules } from 'react-native';
const { FFPay } = NativeModules

export function pay(data, call) {
  FFPay.pay(data, call);
  console.log(data);
}


