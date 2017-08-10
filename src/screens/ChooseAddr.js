import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import {
    RNTAddressPicker,
    startChooseAddress
//   addChooseAddressListener,
//   removeChooseAddressListener
} from "../modules/Address";

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    height: 40,
    alignItems: "center"
  },
  inputTitle: {
    width: 100
  },
  inputEidt: {
    flex: 1
  }
});

class ChooseAddr extends Component {
  static navigationOptions = {
    title: "地址选择"
  };

  constructor(props) {
    super(props);
    this.state = {
      addressString: "广东省 广州市 越秀区()"
    };
  }

//   componentWillMount() {
//     addChooseAddressListener(event => {
//         this.setState({
//             addressString: event.address,
//         });
//     });
//   }

//   componentWillUnmount() {
//     removeChooseAddressListener();
//   }

  renderInput(name, value, change) {
    return (
      <View style={styles.input}>
        <Text style={styles.inputTitle}>
          {name}:
        </Text>
        <TextInput
          style={styles.inputEidt}
          value={value}
          onChangeText={change}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderInput("地址：", this.state.addressString, text =>
          this.setState({
            addressString: text
          })
        )}
        <Button title={"开始选择"} onPress={() => startChooseAddress()} />
        <Text>
          {this.state.addressString}
        </Text>
        <RNTAddressPicker>

        </RNTAddressPicker>
      </View>
    );
  }
}

export default ChooseAddr;
