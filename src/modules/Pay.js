import { NativeModules } from "react-native";
import { DeviceEventEmitter } from "react-native";
const { RTCFFPay } = NativeModules;

/**
 *
 * @export
 * @param {Object} data
 * @param {String} data.appId
 * @param {String} data.merchantCode
 * @param {String} data.outTradeNo
 * @param {String} data.billOrderNo
 * @returns {void}
 */
export function pay(data) {
  RTCFFPay.pay(data);
}

/**
 *
 * ### Usage example
 *``` js
 * import {
 *  pay,
 *  addFFPayResponseListener,
 *  removeFFPayResponseListener,
 *  RESULT_PAY_OK,
 *  RESULT_ERROR_CODE_USER_CANCEL,
 *  RESULT_ERROR_CODE_PAY
 * } from "react-native-ffpay";
 *
 * constructor(props) {
 *   super(props);
 *   this.state = {
 *     appId: "102",
 *     merchantCode: "20012760671",
 *     outTradeNo: "12345678901",
 *     billOrderNo: "201708011408228961000210190",
 *     message: ""
 *   };
 * }
 *
 * componentWillMount() {
 *   addFFPayResponseListener(event => {
 *     switch (event.code) {
 *       case RESULT_PAY_OK:
 *       // pay success
 *         this.setState({
 *           message: event.message,
 *         });
 *         break;
 *       case RESULT_ERROR_CODE_USER_CANCEL:
 *       // pay cancelled
 *         this.setState({
 *           message: event.message,
 *         });
 *         break;
 *       case RESULT_ERROR_CODE_PAY:
 *       // pay error see "message"
 *         this.setState({
 *           message: event.message,
 *         });
 *         break;
 *     }
 *   });
 * }
 *
 * componentWillUnmount() {
 *   removeFFPayResponseListener();
 * }
 * ```
 * @export
 * @param {Function} listener
 *
 */
export function addFFPayResponseListener(listener) {
  DeviceEventEmitter.addListener("FFPayResponse", listener);
}

/**
 *
 * @export
 * remove listener
 */
export function removeFFPayResponseListener() {
  DeviceEventEmitter.removeListener("FFPayResponse");
}

/**
 * Payment result status code: success('100')
 */
export const RESULT_PAY_OK = RTCFFPay.RESULT_PAY_OK;

/**
 * Payment result status code: cancelled('200')
 */
export const RESULT_ERROR_CODE_USER_CANCEL =
  RTCFFPay.RESULT_ERROR_CODE_USER_CANCEL;

/**
 * Payment result status code: Payment error, see “resultMessage” for specific reasons('300')
 */
export const RESULT_ERROR_CODE_PAY = RTCFFPay.RESULT_ERROR_CODE_PAY;

export default RTCFFPay;
