import {
  NativeModules,
  NativeAppEventEmitter,
  NativeEventEmitter,
  Platform
} from "react-native";
const { FFPay } = NativeModules;

const NativeEvent = null;
if (Platform.OS == "ios") {
  NativeEvent = new NativeEventEmitter(FFPay);
} else {
  NativeEvent = NativeAppEventEmitter;
}

const ON_PAY_RESPONSE_EVENT = "FFPayResponse";

export default {
  /**
   * Payment result status code: success('100')
   */
  RESULT_PAY_OK: FFPay.RESULT_PAY_OK,
  /**
   * Payment result status code: cancelled('200')
   */
  RESULT_ERROR_CODE_USER_CANCEL: FFPay.RESULT_ERROR_CODE_USER_CANCEL,
  /**
   * Payment result status code: Payment error, see “resultMessage” for specific reasons('300')
   */
  RESULT_ERROR_CODE_PAY: FFPay.RESULT_ERROR_CODE_PAY,

  /**
   *
   * Pay the callback
   *
   * @param {function} listener
   *
   */
  onPayResponseListener(listener) {
    // this.listener && this.listener.remove();
    this.removeOnPayResponseListener();
    this.listener = NativeEvent.addListener(ON_PAY_RESPONSE_EVENT, listener);
  },

  /**
   * remove Listener
   */
  removeOnPayResponseListener() {
    this.listener && this.listener.remove();
  },

  /**
   * @param {Object} data
   * @param {String} data.appId
   * @param {String} data.merchantCode
   * @param {String} data.outTradeNo
   * @param {String} data.billOrderNo
   * @returns {void}
   */
  pay(data) {
    FFPay.pay(data);
  }
};
