// import React, { Component } from "react";
// import {
// //   DeviceEventEmitter,
// //   NativeEventEmitter,
//   Platform,
//   NativeModules,
//   //requireNativeComponent
// } from "react-native";

import { requireNativeComponent } from 'react-native';

export function startChooseAddress(){
  RNTAddressPicker.startChooseAddress();
}
// requireNativeComponent automatically resolves this to "RNTMapManager"
module.exports = requireNativeComponent('RNTAddressPicker', null);

// import React, { Component, PropTypes } from 'react';
// import { requireNativeComponent } from 'react-native';

// class AddressPicker extends React.Component {
//   render() {
//     return <RNTAddressPicker />;
//   }
// }

// var RNTAddressPicker = requireNativeComponent('RNTAddressPicker', AddressPicker);

// module.exports = AddressPicker;

//var RNTAddressPicker = requireNativeComponent('RNTAddressPicker', AddressPicker);
//var AddressPicker = NativeModules.AddressPicker;
//const {AddressPicker} = NativeModules;
// const AddressPickerEvent = new NativeEventEmitter(AddressPicker);
// const subscription = null;



// export function addChooseAddressListener(listener) {
//   if (Platform.OS == "android") {
//     DeviceEventEmitter.addListener("AddressPickerResponse", listener);
//   } else {
//     subscription = AddressPickerEvent.addListener("AddressPickerResponse", listener);
//   }
// }

// export function removeChooseAddressListener() {
//   if (Platform.OS == "android") {
//     DeviceEventEmitter.removeListener("AddressPickerResponse");
//   } else {
//     subscription.remove();
//   }
// }

//export default  AddressPicker;

